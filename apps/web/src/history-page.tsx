import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { StoredReadingMethod, StoredReadingRecord } from '@liuyao/core';
import { useReadingHistory } from './use-reading-history';
import { useReadingSession } from './reading-session';
import { HistoryCard } from './history-card';
import { HistoryExportImportDialog } from './history-export-import-dialog';
import { ConfirmationDialog } from './components/confirmation-dialog';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from './components/ui/empty';
import { ROUTES } from './route-paths';

export function HistoryPage() {
  const navigate = useNavigate();
  const historyApi = useReadingHistory();
  const { loadReadingIntoSession } = useReadingSession();

  const [exportImportOpen, setExportImportOpen] = useState(false);
  const [deleteCandidateId, setDeleteCandidateId] = useState<string | null>(null);
  const [clearAllConfirmOpen, setClearAllConfirmOpen] = useState(false);

  const handleSelectRecord = (record: StoredReadingRecord) => {
    loadReadingIntoSession(record);
    navigate(ROUTES.result);
  };

  const handleConfirmDelete = () => {
    if (deleteCandidateId) {
      historyApi.removeRecord(deleteCandidateId);
      setDeleteCandidateId(null);
    }
  };

  const handleConfirmClearAll = () => {
    historyApi.clearAll();
    setClearAllConfirmOpen(false);
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Lịch sử gieo quẻ</h1>
          <p className="text-sm text-muted-foreground">
            Lưu trữ offline trên thiết bị • {historyApi.totalCount} quẻ đã lưu
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setExportImportOpen(true)}>
            Sao lưu / Khôi phục
          </Button>
          {historyApi.totalCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:bg-destructive/10"
              onClick={() => setClearAllConfirmOpen(true)}
            >
              Xóa tất cả
            </Button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Tìm theo câu hỏi hoặc tên quẻ..."
            value={historyApi.query}
            onChange={e => historyApi.setQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'automatic', 'manual', 'direct'] as const).map(m => {
            const label =
              m === 'all'
                ? 'Tất cả'
                : m === 'automatic'
                  ? 'Tự động'
                  : m === 'manual'
                    ? 'Thủ công'
                    : 'Trực tiếp';
            return (
              <Button
                key={m}
                size="sm"
                variant={historyApi.methodFilter === m ? 'default' : 'outline'}
                onClick={() => historyApi.setMethodFilter(m as StoredReadingMethod | 'all')}
                className="whitespace-nowrap"
              >
                {label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* History List or Empty state */}
      {historyApi.displayedRecords.length === 0 ? (
        <Empty className="py-12 border rounded-lg bg-card">
          <EmptyHeader>
            <EmptyTitle>Chưa có quẻ nào</EmptyTitle>
            <EmptyDescription>
              {historyApi.query || historyApi.methodFilter !== 'all'
                ? 'Không tìm thấy quẻ nào phù hợp với bộ lọc hiện tại.'
                : 'Bạn chưa có quẻ nào được lưu. Hãy gieo quẻ mới để xem lại sau.'}
            </EmptyDescription>
          </EmptyHeader>
          {historyApi.totalCount === 0 && (
            <div className="pt-2">
              <Button onClick={() => navigate(ROUTES.casting)}>Gieo quẻ ngay</Button>
            </div>
          )}
        </Empty>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {historyApi.displayedRecords.map(record => (
            <HistoryCard
              key={record.id}
              record={record}
              onSelect={handleSelectRecord}
              onDelete={id => setDeleteCandidateId(id)}
            />
          ))}
        </div>
      )}

      {/* Export / Import Dialog */}
      <HistoryExportImportDialog
        open={exportImportOpen}
        onClose={() => setExportImportOpen(false)}
        historyApi={historyApi}
      />

      {/* Delete Single Record Confirmation */}
      {deleteCandidateId && (
        <ConfirmationDialog
          title="Xóa quẻ này?"
          confirmLabel="Xóa vĩnh viễn"
          cancelLabel="Hủy"
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteCandidateId(null)}
        >
          Bạn có chắc chắn muốn xóa bản ghi quẻ này khỏi lịch sử lưu trên thiết bị không?
        </ConfirmationDialog>
      )}

      {/* Clear All Confirmation */}
      {clearAllConfirmOpen && (
        <ConfirmationDialog
          title="Xóa toàn bộ lịch sử?"
          confirmLabel="Xóa tất cả"
          cancelLabel="Hủy"
          onConfirm={handleConfirmClearAll}
          onCancel={() => setClearAllConfirmOpen(false)}
        >
          Toàn bộ {historyApi.totalCount} quẻ sẽ bị xóa vĩnh viễn khỏi thiết bị này. Hành động này
          không thể hoàn tác.
        </ConfirmationDialog>
      )}
    </div>
  );
}
