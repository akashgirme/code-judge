import {
  Badge,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Typography,
} from '@code-judge/ui';
import {
  Submission,
  useGetSubmissionByIdQuery,
  useGetSubmissionsByUserAndProblemQuery,
} from '@code-judge/api-client';
import { useParams } from 'react-router-dom';
import { SubmissionDetailsContainer } from '../submission-details';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { removeSubmission, setSubmission } from '../submissionSlice';
import { useEffect, useState } from 'react';
import { CheckIcon, CircleX, Clock3, MemoryStick } from 'lucide-react';

function getIcon(statusMessage: string) {
  switch (statusMessage) {
    case 'Accepted':
      return <CheckIcon className="h-4 w-4" />;
    default:
      return <CircleX className="h-4 w-4" />;
  }
}

export const AllSubmissionsView = () => {
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<number | null>(null);
  const [trigger, setTrigger] = useState(false);

  const { problemId: pid } = useParams();
  const problemId = Number(pid);

  const dispatch = useAppDispatch();
  const { submission } = useAppSelector((state) => state.submission);

  const {
    data: allSubmissions,
    isFetching,
    isLoading,
    refetch,
  } = useGetSubmissionsByUserAndProblemQuery({
    problemId,
  });

  const { data: submissionDetails, isLoading: getSubmissionIsLoading } =
    useGetSubmissionByIdQuery(
      { submissionId: selectedSubmissionId ?? 0 },
      { skip: selectedSubmissionId === null }
    );

  if (submissionDetails && selectedSubmissionId !== null) {
    dispatch(setSubmission(submissionDetails));
    setSelectedSubmissionId(null);
  }

  const handleGetSubmission = (id: number) => {
    setSelectedSubmissionId(id);
  };

  const handleOnBack = () => {
    dispatch(removeSubmission());
    setTrigger((prev) => !prev);
  };

  useEffect(() => {
    refetch(); // refetch the submissions when `trigger` changes
  }, [trigger, refetch]); // Refetch is called whenever trigger changes

  if (isFetching || isLoading || getSubmissionIsLoading) {
    return (
      <Card>
        <CardContent>Loading...</CardContent>
      </Card>
    );
  }

  if (submission) {
    return (
      <SubmissionDetailsContainer submission={submission} handleOnBack={handleOnBack} />
    );
  }

  return (
    <div className="grid gap-4 pt-4 h-full">
      <Table>
        <TableHeader>
          <TableHead>Status</TableHead>
          <TableHead>Language</TableHead>
          <TableHead>Runtime</TableHead>
          <TableHead>Memory</TableHead>
        </TableHeader>
        <TableBody>
          {allSubmissions?.map((submission: Submission) => (
            <TableRow key={submission.id}>
              <TableCell className="text-left pl-0">
                <Button
                  type="submit"
                  variant="link"
                  className="flex flex-col items-start"
                  onClick={() => handleGetSubmission(submission.id)}
                >
                  <Typography
                    variant="h3"
                    style={{
                      color: submission.statusMessage === 'Accepted' ? 'green' : 'red',
                      fontWeight: 'bold',
                    }}
                  >
                    {getIcon(submission.statusMessage)}
                    {submission.statusMessage}
                  </Typography>
                  <Typography variant="h6">
                    {new Date(submission.createdAt).toLocaleDateString('en-GB')}
                  </Typography>
                </Button>
              </TableCell>
              <TableCell>
                <Badge>{submission.language}</Badge>
              </TableCell>
              <TableCell>
                <Clock3 />
                {submission.statusMessage === 'Accepted' ? (
                  <Typography variant="caption">{`${
                    submission.time * 1000
                  } ms`}</Typography>
                ) : (
                  'N/A'
                )}
              </TableCell>
              <TableCell>
                <MemoryStick />
                {submission.statusMessage === 'Accepted' ? (
                  <Typography variant="caption">{`${(submission.memory / 1024).toFixed(
                    1
                  )} MB`}</Typography>
                ) : (
                  'N/A'
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
