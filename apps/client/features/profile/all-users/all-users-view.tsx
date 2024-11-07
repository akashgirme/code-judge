import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TextLinkButton,
} from '@skill-street-ui/core-design';
import { useGetAllUsersQuery } from '@skill-street-ui/auth-client';
import { costOfMultiConversations, formatDate } from 'apps/home/utils';

export const AllUsersView = () => {
  const { data } = useGetAllUsersQuery({ pageIndex: 0, pageSize: 1000 });

  return (
    <div className="grid gap-6">
      <Table>
        <TableHeader>
          <TableHead>Id</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead>Full Name</TableHead>
          <TableHead>Conversation Count</TableHead>
          <TableHead>Conversation Cost</TableHead>
          <TableHead>Suggestion Instance Count</TableHead>
          <TableHead>Career Choice Count</TableHead>
          <TableHead>Feedback Count</TableHead>
        </TableHeader>
        <TableBody>
          {data?.users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <TextLinkButton
                  target="_blank"
                  href={`/admin/users/${user.id}`}
                >
                  {user.id}
                </TextLinkButton>
              </TableCell>
              <TableCell>{formatDate(user.updatedAt)}</TableCell>
              <TableCell>
                {user.firstName} {user.lastName}
              </TableCell>
              <TableCell>{user.assistantConversations.length}</TableCell>
              <TableCell>
                {costOfMultiConversations(user.assistantConversations)}
              </TableCell>
              <TableCell>{user.suggestionInstancesCount}</TableCell>
              <TableCell>{user.careerChoiceCount}</TableCell>
              <TableCell>{user.feedbackCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
