import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { ROUTES } from './route-paths';

export function ProductInformationPage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);

  return (
    <main className="route-page flex flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-5xl">
          Thông tin sản phẩm
        </h1>
        <Button variant="outline" size="lg" render={<Link to={ROUTES.settings} />}>
          Về cài đặt
        </Button>
      </header>

      <Card id="about" className="scroll-mt-24">
        <CardHeader>
          <CardTitle role="heading" aria-level={2}>
            Giới thiệu Lục Hào
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p>Lập quẻ và tra cứu kiến thức Lục Hào ngay trên thiết bị của bạn.</p>
          <p>
            Bạn có thể gieo tự động, ghi kết quả gieo thủ công hoặc nhập sáu hào để xem quẻ chính,
            quẻ biến và dữ kiện từng hào. Thư viện cung cấp bài học, giải thích và nguồn tham khảo.
            Ứng dụng không tự đưa ra lời đoán và chưa hỗ trợ phân tích theo ngày tháng.
          </p>
          <p>
            Sau lần tải trực tuyến và khi Cài đặt báo hoạt động ngoại tuyến sẵn sàng, bạn có thể lập
            quẻ và tra cứu không cần mạng. Quẻ và câu hỏi chỉ được giữ trong phiên hiện tại, không
            có lịch sử lưu quẻ.
          </p>
          <p>
            <a
              className="underline underline-offset-4"
              href="https://github.com/tungxuan1656/liuyao"
            >
              Mã nguồn và thông tin dự án
            </a>
          </p>
        </CardContent>
      </Card>

      <Card id="privacy" className="scroll-mt-24">
        <CardHeader>
          <CardTitle role="heading" aria-level={2}>
            Quyền riêng tư
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p>
            Câu hỏi, các lần gieo và kết quả được xử lý trong bộ nhớ của trình duyệt, không được ứng
            dụng gửi lên mạng. Tải lại hoặc đóng trang sẽ xóa chúng. Không có tài khoản, đồng bộ đám
            mây, công cụ phân tích hành vi hay dịch vụ trí tuệ nhân tạo.
          </p>
          <p>
            Lựa chọn giao diện sáng hoặc tối được lưu trên thiết bị. Trình duyệt lưu các tệp ứng
            dụng và thư viện để dùng ngoại tuyến. Xóa dữ liệu trang web trong trình duyệt sẽ xóa lựa
            chọn này và bản tải ngoại tuyến.
          </p>
          <p>
            Khi tải ứng dụng hoặc kiểm tra cập nhật, trình duyệt vẫn gửi yêu cầu mạng đến nơi phục
            vụ trang web. Đơn vị lưu trữ có thể ghi địa chỉ mạng, thời gian và đường dẫn truy cập
            theo chính sách của họ. Ứng dụng không quản lý nhật ký của đơn vị lưu trữ. Không nhập
            thông tin nhạy cảm vào địa chỉ trang. Liên kết ngoài sẽ mở trang của bên thứ ba và chịu
            chính sách riêng của trang đó.
          </p>
        </CardContent>
      </Card>

      <Card id="disclaimer" className="scroll-mt-24">
        <CardHeader>
          <CardTitle role="heading" aria-level={2}>
            Lưu ý sử dụng
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Kết quả gieo quẻ chỉ phục vụ học tập và tham khảo, không bảo đảm dự đoán tương lai và
            không thay thế tư vấn y tế, pháp lý hoặc tài chính. Bạn tự quyết định và chịu trách
            nhiệm về hành động của mình.
          </p>
        </CardContent>
      </Card>

      <Card id="licensing" className="scroll-mt-24">
        <CardHeader>
          <CardTitle role="heading" aria-level={2}>
            Giấy phép
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p>
            Mã nguồn và tài liệu dự án dùng giấy phép AGPL-3.0-only, trừ khi có ghi chú khác. Giấy
            phép này không tự cấp quyền sử dụng tên, biểu trưng hay nhãn hiệu sản phẩm.
          </p>
          <p>
            Dữ liệu biên soạn, bản dịch, chú giải và nội dung tham khảo thuộc dự án được bảo lưu mọi
            quyền, không tự động thuộc giấy phép phần mềm. Việc sao chép, sửa đổi hoặc phân phối cần
            có sự cho phép bằng văn bản hoặc căn cứ pháp luật áp dụng. Tư liệu của bên thứ ba giữ
            nguyên quyền và giấy phép riêng; trích nguồn không đồng nghĩa với cấp quyền.
          </p>
          <p>
            Thông báo bản quyền của các thư viện phần mềm đi kèm được giữ trong bản tải ứng dụng.
          </p>
          <p className="flex flex-wrap gap-4">
            <a
              className="underline underline-offset-4"
              href="https://github.com/tungxuan1656/liuyao/blob/main/LICENSE"
            >
              Giấy phép phần mềm
            </a>
            <a
              className="underline underline-offset-4"
              href="https://github.com/tungxuan1656/liuyao/blob/main/LICENSING.md"
            >
              Phạm vi quyền nội dung
            </a>
            <a className="underline underline-offset-4" href="/fonts/NOTICE.md">
              Ghi nhận phông chữ
            </a>
            <a className="underline underline-offset-4" href="/third-party-licenses.txt">
              Giấy phép thư viện phần mềm
            </a>
            <a className="underline underline-offset-4" href="/css-LICENSES.txt">
              Giấy phép giao diện
            </a>
            <a className="underline underline-offset-4" href="/workbox-LICENSE.txt">
              Giấy phép bộ nhớ ngoại tuyến
            </a>
          </p>
        </CardContent>
      </Card>

      <Card id="security" className="scroll-mt-24">
        <CardHeader>
          <CardTitle role="heading" aria-level={2}>
            Báo cáo vấn đề bảo mật
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p>
            Không công khai chi tiết lỗ hổng trong báo lỗi. Dùng chức năng báo cáo riêng tư của
            GitHub nếu kho mã hỗ trợ. Nếu chưa có, chỉ gửi yêu cầu cung cấp kênh liên hệ riêng,
            không kèm chi tiết kỹ thuật về lỗ hổng.
          </p>
          <p>
            <a
              className="underline underline-offset-4"
              href="https://github.com/tungxuan1656/liuyao/blob/main/SECURITY.md"
            >
              Hướng dẫn báo cáo bảo mật
            </a>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
