import {
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
  useGetSubmissionsByUserAndProblemQuery,
} from '@code-judge/api-client';
import { Link, useParams } from 'react-router-dom';

export const AllSubmissionsView = () => {
  const { problemId: pid } = useParams();
  const problemId = Number(pid);
  const { data, isFetching, isLoading } = useGetSubmissionsByUserAndProblemQuery({
    problemId,
  });
  if (isFetching || isLoading) {
    return (
      <Card>
        <CardContent>Loading...</CardContent>
      </Card>
    );
  }
  return (
    <div className="grid gap-4 pt-4 h-full">
      <Table>
        <TableHeader>
          <TableHead>Message</TableHead>
          <TableHead>State</TableHead>
          <TableHead>TestCases Passed</TableHead>
          <TableHead>CreatedAt</TableHead>
        </TableHeader>
        <TableBody>
          {data?.map((submission: Submission) => (
            <TableRow key={submission.id}>
              <TableCell>
                <Link target="_blank" to={'#'}>
                  <Typography variant="h3">{submission.statusMessage}</Typography>
                </Link>
              </TableCell>
              <TableCell>
                <Typography variant="h3">{submission.state}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h3">{`${submission.testCasesPassed ?? '--'}/${
                  submission.totalTestCases ?? '--'
                }`}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h3">{submission.createdAt}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

AllSubmissionsView.Loading = function AllProblemsViewLoading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className=" w-44 h-44 rounded-full border-t-2 animate-spin " />
    </div>
  );
};
