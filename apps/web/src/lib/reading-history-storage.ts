import {
  type ReadingHistoryArchive,
  type StoredReadingRecord,
  validateReadingHistoryArchive,
  validateStoredReadingRecord,
} from '@liuyao/core';

export const READING_HISTORY_STORAGE_KEY = 'liuyao:reading-history:v1';
export const MAX_STORED_READINGS = 100;
export const HISTORY_CHANGE_EVENT = 'liuyao:history-changed';

function isBrowserStorageAvailable(): boolean {
  try {
    const testKey = '__liuyao_storage_test__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

function notifyHistoryChange(): void {
  window.dispatchEvent(new CustomEvent(HISTORY_CHANGE_EVENT));
}

/** Load all stored reading records from localStorage safely. */
export function loadStoredReadingHistory(): readonly StoredReadingRecord[] {
  if (!isBrowserStorageAvailable()) {
    return Object.freeze([]);
  }

  try {
    const raw = window.localStorage.getItem(READING_HISTORY_STORAGE_KEY);
    if (!raw) {
      return Object.freeze([]);
    }

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return Object.freeze([]);
    }

    const validRecords: StoredReadingRecord[] = [];
    for (const item of parsed) {
      try {
        validRecords.push(validateStoredReadingRecord(item));
      } catch {
        // Skip corrupted entries to preserve the healthy subset
      }
    }

    return Object.freeze(validRecords);
  } catch {
    return Object.freeze([]);
  }
}

/** Persist array of records to localStorage with quota protection. */
function persistRecords(records: readonly StoredReadingRecord[]): boolean {
  if (!isBrowserStorageAvailable()) {
    return false;
  }

  try {
    const serialized = JSON.stringify(records);
    window.localStorage.setItem(READING_HISTORY_STORAGE_KEY, serialized);
    notifyHistoryChange();
    return true;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      // If quota exceeded, trim the oldest half of records and retry once
      try {
        const trimmed = records.slice(0, Math.max(10, Math.floor(records.length / 2)));
        window.localStorage.setItem(READING_HISTORY_STORAGE_KEY, JSON.stringify(trimmed));
        notifyHistoryChange();
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }
}

/** Save a new or updated reading record. Prepends to maintain newest-first order. */
export function saveStoredReadingRecord(record: StoredReadingRecord): boolean {
  const current = loadStoredReadingHistory();
  // Filter out any existing record with the same ID, then prepend
  const updated = [record, ...current.filter(r => r.id !== record.id)].slice(
    0,
    MAX_STORED_READINGS,
  );
  return persistRecords(updated);
}

/** Remove a single record by its ID. */
export function deleteStoredReadingRecord(id: string): boolean {
  const current = loadStoredReadingHistory();
  const filtered = current.filter(r => r.id !== id);
  if (filtered.length === current.length) {
    return false;
  }
  return persistRecords(filtered);
}

/** Wipe all stored reading records. */
export function clearAllStoredReadingHistory(): boolean {
  if (!isBrowserStorageAvailable()) {
    return false;
  }
  try {
    window.localStorage.removeItem(READING_HISTORY_STORAGE_KEY);
    notifyHistoryChange();
    return true;
  } catch {
    return false;
  }
}

/** Create an exportable archive snapshot. */
export function exportReadingHistoryArchive(): ReadingHistoryArchive {
  const records = loadStoredReadingHistory();
  return Object.freeze({
    version: 1,
    exportedAt: new Date().toISOString(),
    records,
  });
}

export interface ImportResult {
  readonly importedCount: number;
  readonly totalCount: number;
}

/** Import readings from an archive JSON object. */
export function importReadingHistoryArchive(
  archivePayload: unknown,
  mode: 'merge' | 'overwrite' = 'merge',
): ImportResult {
  const validatedArchive = validateReadingHistoryArchive(archivePayload);
  const incoming = validatedArchive.records;

  let combined: readonly StoredReadingRecord[];
  if (mode === 'overwrite') {
    combined = incoming.slice(0, MAX_STORED_READINGS);
  } else {
    const current = loadStoredReadingHistory();
    const existingIds = new Set(current.map(r => r.id));
    const newItems = incoming.filter(r => !existingIds.has(r.id));
    combined = [...newItems, ...current].slice(0, MAX_STORED_READINGS);
  }

  persistRecords(combined);

  return {
    importedCount: incoming.length,
    totalCount: combined.length,
  };
}

/** Subscribe to storage updates from local actions or other browser windows/tabs. */
export function subscribeToReadingHistory(callback: () => void): () => void {
  const handleCustomEvent = () => callback();
  const handleStorageEvent = (event: StorageEvent) => {
    if (event.key === READING_HISTORY_STORAGE_KEY) {
      callback();
    }
  };

  window.addEventListener(HISTORY_CHANGE_EVENT, handleCustomEvent);
  window.addEventListener('storage', handleStorageEvent);

  return () => {
    window.removeEventListener(HISTORY_CHANGE_EVENT, handleCustomEvent);
    window.removeEventListener('storage', handleStorageEvent);
  };
}
