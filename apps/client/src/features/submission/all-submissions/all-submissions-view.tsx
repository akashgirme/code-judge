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
import { useState } from 'react';

export const AllSubmissionsView = () => {
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<number | null>(null);

  const { problemId: pid } = useParams();
  const problemId = Number(pid);

  const dispatch = useAppDispatch();
  const { submission } = useAppSelector((state) => state.submission);

  const { data, isFetching, isLoading } = useGetSubmissionsByUserAndProblemQuery({
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

  if (isFetching || isLoading || getSubmissionIsLoading) {
    return (
      <Card>
        <CardContent>Loading...</CardContent>
      </Card>
    );
  }

  if (submission) {
    return (
      <SubmissionDetailsContainer
        submission={submission}
        onBack={() => dispatch(removeSubmission())}
      />
    );
  }

  return (
    <div className="grid gap-4 pt-4 h-full">
      <Table>
        <TableHeader>
          <TableHead>Status</TableHead>
          <TableHead>Language</TableHead>
          <TableHead>Testcases</TableHead>
          <TableHead>Runtime</TableHead>
          <TableHead>Memory</TableHead>
        </TableHeader>
        <TableBody>
          {data?.map((submission: Submission) => (
            <TableRow key={submission.id}>
              <TableCell>
                <Button
                  type="submit"
                  variant="link"
                  className="flex flex-col justify-left"
                  onClick={() => handleGetSubmission(submission.id)}
                >
                  <Typography variant="h3">{submission.statusMessage}</Typography>
                  <Typography variant="caption">
                    {new Date(submission.createdAt).toLocaleDateString('en-GB')}
                  </Typography>
                </Button>
              </TableCell>
              <TableCell>
                <Badge>{submission.language}</Badge>
              </TableCell>
              <TableCell>
                <Typography variant="h3">{`${submission.testCasesPassed ?? '--'}/${
                  submission.totalTestCases ?? '--'
                }`}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="caption">{submission.time * 1000} ms</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="caption">
                  {(submission.memory / 1024).toFixed(1)} MB
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
