import { Link } from 'react-router-dom';
import { Button } from './components/ui/button';
import { ROUTES } from './route-paths';

export function RouteErrorPage() {
  return (
    <main className="route-page flex flex-col items-start gap-6">
      <h1 className="font-serif text-3xl font-semibold">Không thể mở trang này</h1>
      <p>Địa chỉ không tồn tại hoặc trang gặp lỗi. Bạn có thể trở về trang chủ để tiếp tục.</p>
      <Button size="lg" render={<Link to={ROUTES.home} />}>
        Về trang chủ
      </Button>
    </main>
  );
}
