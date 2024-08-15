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
  useGetProblemsQuery,
} from '@code-judge/api-client';
import { EditPencil } from 'iconoir-react';
import { TagBadges } from '../components';
import { useSearchParams } from '../../hooks';
import { Can, Action, Subject } from '../../auth/ability';
import { Link } from 'react-router-dom';

export const AllProblemsView = () => {
  const [searchParams, setSearchParams, removeSearchParams] = useSearchParams();

  // TODO: Form should auto-fill values from url , during refresh for Tags Field
  // * Currently not working because in URL , we receive only tagId ,and not tagName
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
  } = useGetProblemsQuery(filterObj);
  return (
    <div className="grid gap-6">
      <div className="w-full flex flex-col gap-3 relative min-h-32 ">
        <Can I={Action.Create} a={Subject.Problem}>
          <Link className="w-max" to="/problems/create">
            <Button variant="outline">Create Post</Button>
          </Link>
        </Can>
      </div>
      <Table>
        <TableHeader>
          <TableHead>Problem Title</TableHead>
          <TableHead>Difficulty</TableHead>
          <TableHead>Tags</TableHead>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

AllProblemsView.Loading = function AllProblemsViewLoading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className=" w-44 h-44 rounded-full border-t-2 animate-spin " />
    </div>
  );
};
