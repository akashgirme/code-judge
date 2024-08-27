import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Typography,
} from '@code-judge/ui';
import { Problem, useGetProblemsQuery } from '@code-judge/api-client';
import { Link } from 'react-router-dom';
import { TagBadges } from '../components';

export const PublicProblemsView = () => {
  const { data: { problems = [] } = {} } = useGetProblemsQuery({
    pageIndex: 0,
    pageSize: 100,
  });

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableHead>Problem Title</TableHead>
          <TableHead>Tags</TableHead>
          <TableHead>Difficulty</TableHead>
          <TableHead>Actions</TableHead>
        </TableHeader>
        <TableBody>
          {problems?.map((problem: Problem) => (
            <TableRow key={problem.id}>
              <TableCell>
                <Typography variant="h3">{problem.title}</Typography>
              </TableCell>
              <TableCell>
                <TagBadges tags={problem.tags} />
              </TableCell>
              <TableCell>
                <Typography variant="body1">{problem.difficulty}</Typography>
              </TableCell>
              <TableCell>
                <Button>
                  <Link to={`/problems/${problem.id}`}>View Problem</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
