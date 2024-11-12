import { SubmissionResponse } from '@code-judge/api-hooks';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@code-judge/core-design';
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Code,
  FileCheck,
  MemoryStick,
  XCircle,
} from 'lucide-react';

interface SubmissionDetailsViewProps {
  submission: SubmissionResponse;
  handleOnBack: () => void;
}

export const SubmissionDetailsView: React.FC<SubmissionDetailsViewProps> = ({
  submission,
  handleOnBack,
}) => {
  const formatDateTime = (dateString: any) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: any) => {
    return status === 'Accepted' ? 'text-green-500' : 'text-red-500';
  };

  const getStatusIcon = (status: any) => {
    return status === 'Accepted' ? (
      <CheckCircle className="h-5 w-5 text-green-500" />
    ) : (
      <XCircle className="h-5 w-5 text-red-500" />
    );
  };
  return (
    <div className="container py-6 space-y-6">
      <Button onClick={handleOnBack} variant="ghost" className="pl-0">
        <ArrowLeft className="mr-2 h-4 w-4" />
        All Submissions
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getStatusIcon(submission.status)}
              <CardTitle
                className={`text-2xl font-bold ${getStatusColor(submission.status)}`}
              >
                {submission.status}
              </CardTitle>
            </div>
            <Badge variant="outline">{submission.language}</Badge>
          </div>
          {submission.status === 'Accepted' && (
            <p className="text-sm text-muted-foreground">
              Submitted at {formatDateTime(submission.createdAt)}
            </p>
          )}
        </CardHeader>
        <CardContent>
          {submission.status === 'Accepted' || submission.status === 'Wrong Answer' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <FileCheck className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Tests Passed: {submission.testCasesPassed}/{submission.totalTestCases}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Runtime: {submission.time * 1000} ms</span>
              </div>
              <div className="flex items-center space-x-2">
                <MemoryStick className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Memory: {(submission.memory / 1024).toFixed(1)} MB
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
              <pre className="text-red-600 text-sm whitespace-pre-wrap">
                <code>{submission.error}</code>
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            <div className="flex items-center space-x-2">
              <Code className="h-5 w-5" />
              <span>Source Code</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <pre className="language-javascript rounded-md bg-muted p-4 overflow-x-auto">
              <code>{submission.sourceCode}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
