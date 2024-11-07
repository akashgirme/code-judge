import { useEffect, useState } from 'react';
import './content-style.css';
interface SanitizedHtmlViewProps {
  content: string;
}

export const SanitizedHtmlView = ({ content }: SanitizedHtmlViewProps) => {
  const [sanitizedContent, setSanitizedContent] = useState('');

  // useEffect(() => {
  //   if (window) {
  //     DOMPurify.addHook('afterSanitizeAttributes', function (node) {
  //       if ('target' in node) {
  //         node.setAttribute('target', '_blank');
  //         node.setAttribute('rel', 'noopener noreferrer');
  //       }
  //     });

  //     setSanitizedContent(DOMPurify.sanitize(content));
  //   }
  // }, [content]);

  return (
    <div
      className="content max-w-none"
      dangerouslySetInnerHTML={{
        __html: sanitizedContent,
      }}
    />
  );
};
