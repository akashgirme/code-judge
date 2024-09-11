import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Typography,
} from '@code-judge/ui';
import {
  GetProblemsForAdminApiArg,
  Problem,
  ProblemStatus,
  useGetProblemsForAdminQuery,
} from '@code-judge/api-client';
import { EditPencil } from 'iconoir-react';
import { TagBadges } from '../components';
import { useSearchParams } from '../../hooks';
import { Can, Action, Subject } from '../../auth/ability';
import { Link } from 'react-router-dom';

export const AllProblemsView = () => {
  const [searchParams, setSearchParams, removeSearchParams] = useSearchParams();

  const filterObj: GetProblemsForAdminApiArg = {
    pageIndex: Number(searchParams.get('pageIndex')) || 0,
    // pageSize: Number(searchParams.get('pageSize')) || 10,
    pageSize: 1000,
    title: searchParams.get('title') ?? undefined,
    status: (searchParams.get('status') as ProblemStatus) ?? undefined,
  };

  const {
    data: { problems = [] } = {},
    isFetching,
    isLoading,
  } = useGetProblemsForAdminQuery(filterObj);
  if (isLoading || isFetching) {
    return (
      <div>
        <Typography variant="h1">Loading...</Typography>
      </div>
    );
  }
  return (
    <div className="grid gap-3">
      <div className="w-full flex flex-col gap-3 pt-2 px-3">
        <Can I={Action.Create} a={Subject.Problem}>
          <Link className="w-max" to="/admin/problems/create">
            <Button variant="outline">Create Problem</Button>
          </Link>
        </Can>
      </div>
      <Table>
        <TableHeader>
          <TableHead>Problem Title</TableHead>
          <TableHead>Difficulty</TableHead>
          <TableHead>Tags</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableHeader>
        <TableBody>
          {problems?.map((problem: Problem) => (
            <TableRow key={problem.id}>
              <TableCell>
                <Link target="_blank" to={`/problems/${problem.id}`}>
                  <Typography variant="h3">{problem.title}</Typography>
                </Link>
              </TableCell>
              <TableCell>
                <Badge>{problem.difficulty}</Badge>
              </TableCell>
              <TableCell>
                <TagBadges tags={problem.tags} />
              </TableCell>
              <TableCell>
                <Typography variant="h3">{problem.status}</Typography>
              </TableCell>
              <TableCell className="grid grid-cols-3">
                <Link to={`/admin/problems/${problem.id}/change-status`}>
                  <Button className="gap-1">
                    <EditPencil />
                    <Typography variant="h3">Change Status</Typography>
                  </Button>
                </Link>

                <Link to={`/admin/problems/${problem.id}/edit`}>
                  <Button className="gap-1">
                    <EditPencil />
                    <Typography variant="h3">Edit problem</Typography>
                  </Button>
                </Link>
                <Link to={`/admin/problems/${problem.id}/add-testcases`}>
                  <Button className="gap-1">
                    <EditPencil />
                    <Typography variant="h3">Edit Testcases</Typography>
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
