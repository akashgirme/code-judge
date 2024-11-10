import { SubmitStatusResponseDto } from '@code-judge/api-hooks';
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ScrollArea,
  Typography,
} from '@code-judge/core-design';
import { ArrowLeft } from 'iconoir-react';
import { CheckCircle2, Clock, Code2, XCircle } from 'lucide-react';

interface SubmitDetailsViewProps {
  data: SubmitStatusResponseDto;
  handleOnBack: () => void;
}

export const SubmitDetailsView: React.FC<SubmitDetailsViewProps> = ({
  data,
  handleOnBack,
}) => {
  const isAccepted = data.status === 'Accepted';

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
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={handleOnBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isAccepted ? (
          <CheckCircle2 className="h-6 w-6 text-green-500" />
        ) : (
          <XCircle className="h-6 w-6 text-red-500" />
        )}
        <h1
          className={`text-2xl font-bold ${
            isAccepted ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {data.status}
        </h1>
      </div>

      {data.error ? (
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px] w-full rounded-md border bg-muted p-4">
              <pre className="text-destructive">{data.error}</pre>
            </ScrollArea>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Test Cases Passed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data.passed} / {data.total}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Time Taken</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">
                  {(data.time * 1000).toFixed(2)} ms
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Memory Used</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(data.memory / 1024).toFixed(1)} MB
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Source Code
            <span className="ml-2 text-muted-foreground">({data.language})</span>
          </CardTitle>
          <Code2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] w-full rounded-md border bg-muted p-4">
            <pre>
              <code>{data.sourceCode}</code>
            </pre>
          </ScrollArea>
        </CardContent>
      </Card>

      {data.createdAt && (
        <p className="text-sm text-muted-foreground">
          Submitted at {formatDateTime(data.createdAt)}
        </p>
      )}
    </div>
  );
};
