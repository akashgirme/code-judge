import { SanitizedHtmlView } from '../../../components/sanitized-html-view';

interface ProblemDetailsProps {
  description: string;
}

export const ProblemDetails = ({ description }: ProblemDetailsProps) => {
  return (
    <div className="w-full lg:w-3/4 xl:w-1/2 py-6 max-lg:px-4">
      //TODO: Here insted SanitizedHtmlView you markdownView components
      <SanitizedHtmlView content={description} />
    </div>
  );
};
