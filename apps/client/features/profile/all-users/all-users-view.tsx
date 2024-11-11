import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TextLinkButton,
} from '@code-judge/core-design';
import { useGetAllUsersQuery } from '@code-judge/api-hooks';

export const AllUsersView = () => {
  const { data, isFetching } = useGetAllUsersQuery({ pageIndex: 0, pageSize: 1000 });

  //TODO: Add edit button to change user role
  return (
    <div className="grid gap-6">
      <Table>
        <TableHeader>
          <TableHead>Id</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Full Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>OnBoarded</TableHead>
        </TableHeader>
        <TableBody>
          {!isFetching &&
            data?.users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <TextLinkButton target="_blank" href={`/admin/users/${user.id}`}>
                    {user.id}
                  </TextLinkButton>
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.hasOnboarded ? 'yes' : 'no'}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};
