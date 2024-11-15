import { ResultDto, RunStatusResponseDto } from '@code-judge/api-hooks';
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Typography,
} from '@code-judge/core-design';
import { CheckCircle2, XCircle } from 'lucide-react';

interface RunDetailsViewProps {
  data: RunStatusResponseDto;
  handleOnBack: () => void;
}

export const RunDetailsView: React.FC<RunDetailsViewProps> = ({ data, handleOnBack }) => {
  if (data.state !== 'Success') {
    return (
      <>
        <Button variant="link" onClick={handleOnBack}>
          Back
        </Button>
        <Alert>
          <Typography className="flex items-center gap-2">{data.state}</Typography>
          {data.state === 'Pending' && 'Your submission is in the queue...'}
          {data.state === 'Started' && 'Starting to process your submission...'}
          {data.state === 'Running' && 'Running your code against test cases...'}
          {data.state === 'Error' && 'There was an error processing your submission.'}
        </Alert>
      </>
    );
  }

  if (
    data.status === 'Compile error' ||
    data.status === 'Runtime error' ||
    data.status === 'Memory limit exceeded' ||
    data.status === 'Time limit exceeded'
  ) {
    return (
      <Card>
        <Button variant="link" onClick={handleOnBack}>
          Back
        </Button>
        <CardHeader className="border-b">
          <CardTitle className="text-destructive flex items-center gap-2">
            <XCircle className="h-5 w-5" />
            {data.status}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm">
              {data.error}
            </pre>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (data.status === 'Accepted' || data.status === 'Wrong Answer') {
    return (
      <Card>
        <Button variant="link" onClick={handleOnBack}>
          Back
        </Button>
        <CardHeader className="border-b">
          {data.status === 'Accepted' ? (
            <CardTitle className="text-green-600 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Congratulations!
            </CardTitle>
          ) : (
            <CardTitle className="text-green-600 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Wrong Answer!
            </CardTitle>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[500px]">
            {data.result.map((testCase: ResultDto, index) => (
              <div key={index} className="border-b last:border-0">
                <div className="flex items-center gap-2 p-4 bg-muted/50">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Sample Test case {index}</span>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium">Input (stdin)</h3>
                    </div>
                    <pre className="bg-muted/50 p-4 rounded-lg text-sm whitespace-pre-wrap">
                      {testCase.input}
                    </pre>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium">Your Output (stdout)</h3>
                    </div>
                    <pre className="bg-muted/50 p-4 rounded-lg text-sm whitespace-pre-wrap">
                      {testCase.output}
                    </pre>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium">Expected Output</h3>
                    </div>
                    <pre className="bg-muted/50 p-4 rounded-lg text-sm whitespace-pre-wrap">
                      {testCase.expectedOutput}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <Button variant="link" onClick={handleOnBack}>
        Back
      </Button>
      <Typography variant="body1">Status: {data.state}</Typography>
    </Card>
  );
};
