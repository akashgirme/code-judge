import { SubmissionDto } from '@code-judge/api-client';
import { Button, Typography } from '@code-judge/ui';
import { ArrowLeft } from 'iconoir-react';

interface SubmissionDetailsViewProps {
  submission: SubmissionDto;
  handleOnBack: () => void;
}

export const SubmissionDetailsView: React.FC<SubmissionDetailsViewProps> = ({
  submission,
  handleOnBack,
}) => {
  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);

    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    const formattedDate = date.toLocaleDateString('en-US', dateOptions);
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    const formattedTime = date.toLocaleTimeString('en-US', timeOptions);

    return `${formattedDate} ${formattedTime}`;
  };
  return (
    <div>
      <Button onClick={() => handleOnBack()} variant="ghost">
        <ArrowLeft className="w-4 h-4" />
        All Submissions
      </Button>
      <div>
        <Typography
          variant="h2"
          style={{
            color: submission.statusMessage === 'Accepted' ? 'green' : 'red',
            fontWeight: 'bold',
          }}
        >
          {submission.statusMessage}
        </Typography>

        {submission.statusMessage === 'Accepted' && (
          <Typography variant="caption">
            submitted at {formatDateTime(submission.createdAt)}
          </Typography>
        )}
      </div>
      <div>
        {submission.statusMessage === 'Accepted' ||
        submission.statusMessage === 'Wrong Answer' ? (
          ''
        ) : (
          <div>
            <div
              style={{
                maxHeight: '300px',
                overflowX: 'auto',
                overflowY: 'auto',
                backgroundColor: '#eeeeee',
                borderRadius: '4px',
              }}
              className="w-full p-4"
            >
              {' '}
              <pre
                style={{
                  color: '#f28b82',
                  whiteSpace: 'pre-wrap',
                }}
              >
                <code>{submission.stderr}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
      <div>
        {submission.statusMessage === 'Accepted' ||
        submission.statusMessage === 'Wrong Answer' ? (
          <div>
            <ul>
              <li>
                <b>Tests Passed: </b>
                {submission.testCasesPassed}/{submission.totalTestCases}
              </li>
              <li>
                <b>Runtime: </b>
                {submission.time * 1000} ms
              </li>
              <li>
                <b>Memory: </b>
                {(submission.memory / 1024).toFixed(1)} MB
              </li>
            </ul>
          </div>
        ) : (
          ''
        )}
      </div>
      <div>
        <p>Code | {submission.language} </p>
        <div
          style={{
            maxHeight: '300px',
            overflowX: 'auto',
            overflowY: 'auto',
            backgroundColor: '#eeeeee',
            borderRadius: '4px',
          }}
          className="w-full p-4"
        >
          <pre>
            <code>{submission.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
