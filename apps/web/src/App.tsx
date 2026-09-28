import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useReadingSession } from './reading-session';
import { ROUTES } from './route-paths';
import { ConfirmationDialog } from './components/confirmation-dialog';
import './App.css';

export default function App() {
  const navigate = useNavigate();
  const { draft, reading, question, method, setDraft, setQuestion, setMethod, clearSession } =
    useReadingSession();
  const [replaceReading, setReplaceReading] = useState(false);

  const entryQuestion = draft?.question ?? question;
  const entryMethod = draft?.method ?? method;

  function begin() {
    if (draft) {
      navigate(ROUTES.casting);
      return;
    }
    setDraft({ question, method, lines: [], step: 0 });
    navigate(ROUTES.casting);
  }

  function confirmReplacement() {
    clearSession();
    setReplaceReading(false);
  }

  return (
    <main className="reading-page">
      <header className="reading-heading">
        <p className="eyebrow">Không gian gieo quẻ</p>
        <h1>Lục Hào</h1>
        <p>
          Lập quẻ sáu hào. Câu hỏi và quẻ đang thực hiện chỉ được giữ trong phiên trình duyệt này.
        </p>
      </header>

      {reading ? (
        <section className="reading-card" aria-labelledby="completed-reading-heading">
          <p className="eyebrow">Đã lập quẻ</p>
          <h2 id="completed-reading-heading">{reading.question || 'Quẻ chưa đặt tên'}</h2>
          <p>
            Phương pháp:{' '}
            {reading.method === 'automatic'
              ? 'Gieo tự động'
              : reading.method === 'manual'
                ? 'Gieo thủ công'
                : 'Nhập trực tiếp'}
          </p>
          <p>Các hào, từ hào một đến hào sáu: {reading.lines.join(', ')}</p>
          <p>Mã quẻ chính: {reading.result.primaryHexagramId}</p>
          {reading.result.changedHexagramId && (
            <p>Mã quẻ biến: {reading.result.changedHexagramId}</p>
          )}
          <Link className="reading-link" to={ROUTES.result}>
            Xem kết quả
          </Link>
          <p className="session-note">
            Quẻ này chỉ được giữ trong bộ nhớ và sẽ bị xóa nếu bạn tải lại ứng dụng.
          </p>
          <div className="flow-actions">
            <Link className="reading-link" to={ROUTES.library}>
              Thư viện
            </Link>
            <Link className="reading-link" to={ROUTES.settings}>
              Cài đặt
            </Link>
            <button type="button" onClick={() => setReplaceReading(true)}>
              Lập quẻ mới
            </button>
          </div>
        </section>
      ) : (
        <section className="reading-card" aria-labelledby="new-reading-heading">
          <h2 id="new-reading-heading">Lập quẻ mới</h2>
          {draft && (
            <p role="status">
              Bạn đang có bản gieo quẻ chưa hoàn tất. Hãy tiếp tục hoặc bắt đầu lại.
            </p>
          )}
          <label htmlFor="reading-question">Câu hỏi (không bắt buộc)</label>
          <textarea
            id="reading-question"
            rows={3}
            value={entryQuestion}
            onChange={event =>
              draft
                ? setDraft({ ...draft, question: event.target.value })
                : setQuestion(event.target.value)
            }
            placeholder="Bạn muốn suy ngẫm về điều gì?"
          />
          <p className="session-note">
            Câu hỏi chỉ tồn tại trong phiên này, không được lưu hoặc sao lưu. Tải lại ứng dụng có
            thể làm mất câu hỏi.
          </p>
          <fieldset>
            <legend>Phương pháp lập quẻ</legend>
            {(
              [
                ['automatic', 'Gieo tự động'],
                ['manual', 'Gieo thủ công'],
                ['direct', 'Nhập trực tiếp'],
              ] as const
            ).map(([value, label]) => (
              <label className="method-option" key={value}>
                <input
                  type="radio"
                  name="casting-method"
                  value={value}
                  checked={entryMethod === value}
                  onChange={() =>
                    draft ? setDraft({ ...draft, method: value }) : setMethod(value)
                  }
                />
                {label}
              </label>
            ))}
          </fieldset>
          <button type="button" onClick={begin}>
            {draft ? 'Tiếp tục gieo quẻ' : 'Bắt đầu gieo quẻ'}
          </button>
          <p className="session-note">
            Bản gieo và câu hỏi chỉ tồn tại trong bộ nhớ; không có lịch sử hoặc bản sao lưu.
          </p>
        </section>
      )}
      {replaceReading && (
        <ConfirmationDialog
          title="Lập quẻ mới?"
          confirmLabel="Thay quẻ hiện tại"
          cancelLabel="Giữ quẻ hiện tại"
          onCancel={() => setReplaceReading(false)}
          onConfirm={confirmReplacement}
        >
          Bắt đầu quẻ mới sẽ thay thế quẻ đã hoàn tất đang được giữ trong bộ nhớ.
        </ConfirmationDialog>
      )}
    </main>
  );
}
