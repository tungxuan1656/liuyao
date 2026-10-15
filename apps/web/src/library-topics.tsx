import { listTopics } from '@liuyao/knowledge';
import { Link } from 'react-router-dom';
import { Button } from './components/ui/button';
import { ROUTES } from './route-paths';

export function LibraryTopics({ topicId }: { topicId?: string }) {
  return (
    <nav aria-label="Chủ đề bài viết" className="flex flex-wrap gap-2">
      <Button
        variant={topicId ? 'outline' : 'secondary'}
        size="lg"
        render={<Link to={`${ROUTES.library}?category=articles`} />}
        aria-current={!topicId ? 'page' : undefined}
      >
        Tất cả bài viết
      </Button>
      {listTopics().map(topic => (
        <Button
          key={topic.id}
          variant={topicId === topic.id ? 'secondary' : 'outline'}
          size="lg"
          className="h-auto min-h-11 whitespace-normal text-left"
          render={<Link to={ROUTES.libraryTopic(topic.id)} />}
          aria-current={topicId === topic.id ? 'page' : undefined}
        >
          {topic.title}
        </Button>
      ))}
    </nav>
  );
}
