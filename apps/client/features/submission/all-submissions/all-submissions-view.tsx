import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@code-judge/core-design';
import { CheckCircle, Clock, FileCheck, MemoryStick, XCircle } from 'lucide-react';
import { SubmissionResponse } from '@code-judge/api-hooks';
import React from 'react';
import { useAppDispatch } from 'apps/client/app/store';
import { setsubmissionId } from '../services';

interface AllSubmissionsViewProps {
  data?: SubmissionResponse[];
  isFetching: Boolean;
}

export const AllSubmissionsView: React.FC<AllSubmissionsViewProps> = ({
  data,
  isFetching,
}) => {
  const dispatch = useAppDispatch();
  const handleSubmissionClick = (id: number) => {
    dispatch(setsubmissionId(id));
  };

  const getStatusIcon = (status: any) => {
    return status === 'Accepted' ? (
      <CheckCircle className="h-5 w-5 text-green-500" />
    ) : (
      <XCircle className="h-5 w-5 text-red-500" />
    );
  };

  const getStatusColor = (status: any) => {
    return status === 'Accepted' ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className="container py-6">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px] font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Language</TableHead>
              <TableHead className="font-semibold">Runtime</TableHead>
              <TableHead className="font-semibold">Memory</TableHead>
              <TableHead className="font-semibold">Test Cases</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isFetching ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : data?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No submissions found.
                </TableCell>
              </TableRow>
            ) : (
              data?.map((submission: SubmissionResponse) => (
                <TableRow
                  key={submission.id}
                  onClick={() => handleSubmissionClick(submission.id)}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(submission.status)}
                      <span
                        className={`font-semibold ${getStatusColor(submission.status)}`}
                      >
                        {submission.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{submission.language}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {submission.status === 'Accepted'
                          ? `${submission.time * 1000} ms`
                          : 'N/A'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <MemoryStick className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {submission.status === 'Accepted'
                          ? `${(submission.memory / 1024).toFixed(1)} MB`
                          : 'N/A'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <FileCheck className="h-4 w-4 text-muted-foreground" />
                      <span>{`${submission.testCasesPassed}/${submission.totalTestCases}`}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
