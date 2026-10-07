import { useState, type ChangeEvent } from 'react';
import { Button } from './components/ui/button';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './components/ui/alert-dialog';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
import { Field, FieldLabel } from './components/ui/field';
import type { useReadingHistory } from './use-reading-history';

type ExportImportDialogProps = {
  open: boolean;
  onClose: () => void;
  historyApi: ReturnType<typeof useReadingHistory>;
};

export function HistoryExportImportDialog({ open, onClose, historyApi }: ExportImportDialogProps) {
  const [mode, setMode] = useState<'export' | 'import'>('export');
  const [importMergeMode, setImportMergeMode] = useState<'merge' | 'overwrite'>('merge');
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleExport = () => {
    try {
      const archive = historyApi.exportArchive();
      const json = JSON.stringify(archive, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const dateStr = new Date().toISOString().slice(0, 10);
      link.href = url;
      link.download = `liuyao-history-${dateStr}.json`;
      link.click();
      URL.revokeObjectURL(url);
      setStatusMessage({
        type: 'success',
        text: `Đã xuất ${archive.records.length} quẻ thành công!`,
      });
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'Không thể xuất dữ liệu. Vui lòng thử lại.',
      });
    }
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      try {
        const rawContent = e.target?.result;
        if (typeof rawContent !== 'string') {
          throw new Error('Invalid file format');
        }
        const parsed = JSON.parse(rawContent);
        const result = historyApi.importArchive(parsed, importMergeMode);
        setStatusMessage({
          type: 'success',
          text: `Đã nhập ${result.importedCount} quẻ thành công (Tổng: ${result.totalCount}).`,
        });
      } catch (err) {
        setStatusMessage({
          type: 'error',
          text: err instanceof Error ? err.message : 'Tệp sao lưu không hợp lệ.',
        });
      }
    };
    reader.readAsText(file);
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={isOpen => {
        if (!isOpen) {
          setStatusMessage(null);
          onClose();
        }
      }}
    >
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Quản lý dữ liệu lịch sử</AlertDialogTitle>
          <AlertDialogDescription>
            Sao lưu và khôi phục toàn bộ các lần gieo quẻ trên thiết bị này.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 py-2">
          <div className="flex gap-2 border-b pb-3">
            <Button
              size="sm"
              variant={mode === 'export' ? 'default' : 'outline'}
              onClick={() => {
                setMode('export');
                setStatusMessage(null);
              }}
            >
              Xuất tệp sao lưu
            </Button>
            <Button
              size="sm"
              variant={mode === 'import' ? 'default' : 'outline'}
              onClick={() => {
                setMode('import');
                setStatusMessage(null);
              }}
            >
              Nhập từ tệp
            </Button>
          </div>

          {mode === 'export' ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Tải về tệp JSON chứa tất cả {historyApi.totalCount} quẻ đã lưu cùng chi tiết động
                hào và kết quả gieo.
              </p>
              <Button onClick={handleExport} disabled={historyApi.totalCount === 0}>
                Tải xuống tệp .json
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Field>
                <FieldLabel>Chế độ nhập dữ liệu</FieldLabel>
                <RadioGroup
                  value={importMergeMode}
                  onValueChange={v => setImportMergeMode(v as 'merge' | 'overwrite')}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="merge" id="mode-merge" />
                    <label htmlFor="mode-merge" className="text-sm cursor-pointer">
                      Gộp vào dữ liệu hiện tại (giữ quẻ cũ)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="overwrite" id="mode-overwrite" />
                    <label htmlFor="mode-overwrite" className="text-sm cursor-pointer">
                      Ghi đè hoàn toàn (xóa quẻ cũ)
                    </label>
                  </div>
                </RadioGroup>
              </Field>

              <div>
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileUpload}
                  className="text-sm block w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:opacity-90"
                />
              </div>
            </div>
          )}

          {statusMessage && (
            <Alert variant={statusMessage.type === 'error' ? 'destructive' : 'default'}>
              <AlertTitle>{statusMessage.type === 'error' ? 'Lỗi' : 'Thành công'}</AlertTitle>
              <AlertDescription>{statusMessage.text}</AlertDescription>
            </Alert>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Đóng</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
