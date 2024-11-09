import { MarkdownRenderer } from '@code-judge/core-design';

interface ProblemDetailsProps {
  description: string;
}

export const ProblemDetails = ({ description }: ProblemDetailsProps) => {
  return (
    <div className="w-full flex-1 overflow-auto">
      <MarkdownRenderer content={description} />
    </div>
  );
};
