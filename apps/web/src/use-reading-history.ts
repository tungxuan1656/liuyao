import { useEffect, useMemo, useState } from 'react';
import {
  filterReadingHistory,
  sortReadingHistory,
  type HistoryFilterCriteria,
  type ReadingHistoryArchive,
  type StoredReadingMethod,
  type StoredReadingRecord,
} from '@liuyao/core';
import {
  clearAllStoredReadingHistory,
  deleteStoredReadingRecord,
  exportReadingHistoryArchive,
  importReadingHistoryArchive,
  loadStoredReadingHistory,
  subscribeToReadingHistory,
  type ImportResult,
} from './lib/reading-history-storage';

export function useReadingHistory() {
  const [records, setRecords] = useState<readonly StoredReadingRecord[]>(() =>
    loadStoredReadingHistory(),
  );
  const [query, setQuery] = useState('');
  const [methodFilter, setMethodFilter] = useState<StoredReadingMethod | 'all'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  useEffect(() => {
    const unsubscribe = subscribeToReadingHistory(() => {
      setRecords(loadStoredReadingHistory());
    });
    return unsubscribe;
  }, []);

  const criteria: HistoryFilterCriteria = useMemo(() => {
    const result: { query?: string; method?: StoredReadingMethod } = {};
    if (query.trim().length > 0) {
      result.query = query.trim();
    }
    if (methodFilter !== 'all') {
      result.method = methodFilter;
    }
    return result;
  }, [query, methodFilter]);

  const displayedRecords = useMemo(() => {
    const filtered = filterReadingHistory(records, criteria);
    return sortReadingHistory(filtered, sortOrder);
  }, [records, criteria, sortOrder]);

  const removeRecord = (id: string): boolean => {
    const success = deleteStoredReadingRecord(id);
    if (success) {
      setRecords(loadStoredReadingHistory());
    }
    return success;
  };

  const clearAll = (): boolean => {
    const success = clearAllStoredReadingHistory();
    if (success) {
      setRecords([]);
    }
    return success;
  };

  const importArchive = (data: unknown, mode: 'merge' | 'overwrite' = 'merge'): ImportResult => {
    const result = importReadingHistoryArchive(data, mode);
    setRecords(loadStoredReadingHistory());
    return result;
  };

  const exportArchive = (): ReadingHistoryArchive => {
    return exportReadingHistoryArchive();
  };

  return {
    records,
    displayedRecords,
    totalCount: records.length,
    query,
    setQuery,
    methodFilter,
    setMethodFilter,
    sortOrder,
    setSortOrder,
    removeRecord,
    clearAll,
    importArchive,
    exportArchive,
  };
}
