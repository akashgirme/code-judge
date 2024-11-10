import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@code-judge/core-design';
import {
  GetProblemsForAdminApiArg,
  ProblemStatus,
  useGetProblemsForAdminQuery,
} from '@code-judge/api-hooks';
import Link from 'next/link';
import { EditPencil } from 'iconoir-react';
import { TagBadges } from '../../components/tag-badges';
import FiltersPanel from './components/filters-panel';
import { useSearchParams } from 'apps/client/features/hooks';
import { Can } from 'apps/client/features/auth/ability/Can';
import { Action, Subject } from 'apps/client/features/auth/ability/ability-factory';

//TODO: Error in backend while fetching the data 'bad Request' (validation Errors)
export const AllProblemsView = () => {
  const [searchParams, setSearchParams, removeSearchParams] = useSearchParams();

  // TODO: Form should auto-fill values from url , during refresh for Tags Field
  // * Currently not working because in URL , we receive only tagId ,and not tagName
  const filterObj: GetProblemsForAdminApiArg = {
    // pageIndex: Number(searchParams.get('pageIndex')) || 0,
    // pageSize: Number(searchParams.get('pageSize')) || 10,
    pageIndex: 0,
    pageSize: 1000,
    order: 'ASC',
    title: searchParams.get('title') ?? undefined,
    status: (searchParams.get('status') as ProblemStatus) ?? undefined,
    // tagIds: searchParams.get('tagIds')?.split(',') ?? [],
    tagIds:
      searchParams
        .get('tagIds')
        ?.split(',')
        .map((id) => Number(id)) // Convert each string to a number
        .filter((id) => !isNaN(id)) ?? // Optionally filter out any invalid numbers
      [],
  };

  const {
    data: { problems = [] } = {},
    isFetching,
    isLoading,
  } = useGetProblemsForAdminQuery(filterObj);
  return (
    <div className="grid gap-6">
      <div className="w-full flex flex-col gap-3 relative min-h-32 ">
        <Can I={Action.Create} a={Subject.Problem}>
          <Link className="w-max" href="/admin/problems/create-problem">
            <Button variant="primary-outline">Create Problem</Button>
          </Link>
        </Can>
        <FiltersPanel
          filterObj={filterObj}
          setSearchParams={setSearchParams}
          removeSearchParams={removeSearchParams}
          disabled={isLoading || isFetching}
        />
      </div>
      <Table>
        <TableHeader>
          <TableHead>Problem Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Tags</TableHead>
          <TableHead>Actions</TableHead>
        </TableHeader>
        <TableBody>
          {problems?.map((problem) => (
            <TableRow key={problem.id}>
              <TableCell>
                <Link target="_blank" href={`/problems/${problem.id}`}>
                  {problem.title}
                </Link>
              </TableCell>
              <TableCell>
                {problem.author.firstName} {problem.author.lastName}
              </TableCell>
              <TableCell>
                <Badge>{problem.status}</Badge>
              </TableCell>
              <TableCell>
                <TagBadges tags={problem.tags} />
              </TableCell>
              <TableCell>
                <Badge>{problem.difficulty}</Badge>
              </TableCell>
              <TableCell className="grid gap-3 grid-flow-col">
                <Can I={Action.UpdateOwn} a={Subject.Problem}>
                  <a href={`/admin/problems/${problem.id}/edit`} target="_blank">
                    <Button>
                      <EditPencil />
                    </Button>
                  </a>
                </Can>
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
