import { SubmissionDto } from '@code-judge/api-client';

interface SubmissionDetailsViewProps {
  submission: SubmissionDto;
  onBack: any;
}

export const SubmissionDetailsView: React.FC<SubmissionDetailsViewProps> = ({
  submission,
  onBack,
}) => {
  return (
    <div>
      <button onClick={onBack}>Back to Submissions</button>
      <h1>Submission Details for ID: {submission.id}</h1>
      <p>Status: {submission.statusMessage}</p>
      <p>Language: {submission.language}</p>
      <p>
        Testcases: {submission.testCasesPassed} / {submission.totalTestCases}
      </p>
      <p>Runtime: {submission.time * 1000} ms</p>
      <p>Memory: {(submission.memory / 1024).toFixed(1)} MB</p>
      <p>Error: {submission.stderr}</p>
      <p>Code: {submission.code}</p>
    </div>
  );
};
