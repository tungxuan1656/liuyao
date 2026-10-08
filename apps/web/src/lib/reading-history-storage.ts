import {
  type ReadingHistoryArchive,
  type StoredReadingRecord,
  validateReadingHistoryArchive,
  validateStoredReadingRecord,
} from '@liuyao/core';

export const READING_HISTORY_STORAGE_KEY = 'liuyao:reading-history:v1';
export const MAX_STORED_READINGS = 100;
export const HISTORY_CHANGE_EVENT = 'liuyao:history-changed';

function notifyHistoryChange(): void {
  window.dispatchEvent(new CustomEvent(HISTORY_CHANGE_EVENT));
}

/** Load all stored reading records from localStorage safely without requiring write access. */
export function loadStoredReadingHistory(): readonly StoredReadingRecord[] {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return Object.freeze([]);
    }

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

/** Directly writes serialized records to localStorage. Returns true on success, false on quota/error. */
function writeRawRecords(records: readonly StoredReadingRecord[]): boolean {
  if (typeof window === 'undefined' || !window.localStorage) {
    return false;
  }
  try {
    const serialized = JSON.stringify(records);
    window.localStorage.setItem(READING_HISTORY_STORAGE_KEY, serialized);
    notifyHistoryChange();
    return true;
  } catch {
    return false;
  }
}

/** Save a new or updated reading record. Prepends to maintain newest-first order.
 * If quota is exceeded, trims the oldest records one by one or in small batches to fit. */
export function saveStoredReadingRecord(record: StoredReadingRecord): boolean {
  const current = loadStoredReadingHistory();
  // Filter out any existing record with the same ID, then prepend
  let candidate = [record, ...current.filter(r => r.id !== record.id)].slice(
    0,
    MAX_STORED_READINGS,
  );

  while (candidate.length > 0) {
    if (writeRawRecords(candidate)) {
      return true;
    }
    // Storage quota exceeded: remove oldest record from candidate and retry
    candidate = candidate.slice(0, candidate.length - 1);
  }

  return false;
}

/** Remove a single record by its ID. */
export function deleteStoredReadingRecord(id: string): boolean {
  const current = loadStoredReadingHistory();
  const filtered = current.filter(r => r.id !== id);
  if (filtered.length === current.length) {
    return false;
  }
  return writeRawRecords(filtered);
}

/** Wipe all stored reading records. */
export function clearAllStoredReadingHistory(): boolean {
  if (typeof window === 'undefined' || !window.localStorage) {
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
  readonly success: boolean;
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
  const current = loadStoredReadingHistory();

  if (mode === 'overwrite') {
    let candidate = incoming.slice(0, MAX_STORED_READINGS);
    while (candidate.length > 0) {
      if (writeRawRecords(candidate)) {
        return {
          success: true,
          importedCount: candidate.length,
          totalCount: candidate.length,
        };
      }
      candidate = candidate.slice(0, candidate.length - 1);
    }
    // Cannot write even 1 record
    return {
      success: false,
      importedCount: 0,
      totalCount: current.length,
    };
  }

  // mode === 'merge':
  // NEVER delete or trim existing user records to make room for incoming ones.
  const existingIds = new Set(current.map(r => r.id));
  const newItems = incoming.filter(r => !existingIds.has(r.id));
  const availableSlots = Math.max(0, MAX_STORED_READINGS - current.length);
  let candidateNew = newItems.slice(0, availableSlots);

  // If there are no new items to add, it's a no-op success
  if (candidateNew.length === 0) {
    return {
      success: true,
      importedCount: 0,
      totalCount: current.length,
    };
  }

  // Attempt to write [candidateNew + current]. If quota fails, reduce candidateNew until it fits.
  while (candidateNew.length > 0) {
    const combined = [...candidateNew, ...current];
    if (writeRawRecords(combined)) {
      return {
        success: true,
        importedCount: candidateNew.length,
        totalCount: combined.length,
      };
    }
    // Reduce incoming items to fit quota without touching current items
    candidateNew = candidateNew.slice(0, candidateNew.length - 1);
  }

  // Storage is completely full, cannot even fit 1 new record without compromising existing records.
  // Existing records remain 100% intact.
  return {
    success: false,
    importedCount: 0,
    totalCount: current.length,
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
