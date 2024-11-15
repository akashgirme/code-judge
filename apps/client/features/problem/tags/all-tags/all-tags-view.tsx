import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@code-judge/core-design';
import { useGetAllTagsQuery } from '@code-judge/api-hooks';
import Link from 'next/link';
import { EditPencil } from 'iconoir-react';
import { Can } from 'apps/client/features/auth/ability/Can';
import { Action, Subject } from 'apps/client/features/auth/ability/ability-factory';

export const AllTagsView = () => {
  const { data } = useGetAllTagsQuery();

  return (
    <div className="grid gap-6">
      <Can I={Action.Create} a={Subject.Tag}>
        <Link href="/admin/problems/tags/create-tag">
          <Button variant="primary-outline">Create Tag</Button>
        </Link>
      </Can>
      <Table>
        <TableHeader>
          <TableHead>Tag Name</TableHead>
          <TableHead>Actions</TableHead>
        </TableHeader>
        <TableBody>
          {data?.map((tag) => (
            <TableRow key={tag.id}>
              <TableCell>{tag.name}</TableCell>
              <TableCell className="grid gap-3 grid-flow-col">
                <Can I={Action.Update} a={Subject.Tag}>
                  <a href={`/admin/problems/tags/${tag.id}/edit`} target="_blank">
                    <Button size="icon">
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
