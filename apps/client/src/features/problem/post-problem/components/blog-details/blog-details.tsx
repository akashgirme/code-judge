import { SanitizedHtmlView } from '../../../components/sanitized-html-view';
import { ExternalLinks } from './external-links';

interface BlogDetailsProps {
  blogTitle: string;
  content: string;
}

export const BlogDetails = ({ blogTitle, content }: BlogDetailsProps) => {
  return (
    <div className="w-full lg:w-3/4 xl:w-1/2 py-6 max-lg:px-4">
      <SanitizedHtmlView content={content} />
      <ExternalLinks blogTitle={blogTitle} />
    </div>
  );
};
