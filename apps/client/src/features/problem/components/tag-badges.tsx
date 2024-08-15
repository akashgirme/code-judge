import { Tag } from '@code-judge/api-client';
import { Badge } from '@code-judge/ui';
interface TagBadgesProps {
  tags: Tag[];
}
export const TagBadges: React.FC<TagBadgesProps> = ({ tags }) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tag) => (
        <Badge key={`tag-${tag.id}`}>{tag.name}</Badge>
      ))}
    </div>
  );
};
