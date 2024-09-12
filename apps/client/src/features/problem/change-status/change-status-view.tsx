'use client';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Typography,
} from '@code-judge/ui';
import {
  useChangeProblemStatusMutation,
  useGetProblemForAdminQuery,
} from '@code-judge/api-client';
import { ProblemStatusField } from '../components/form-fields';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { TagBadges } from '../components';
import { ChangeStatusModel } from './change-status-logic';
import { MarkdownView } from '../../../components';

interface ChangeStatusViewProps {
  form: UseFormReturn<ChangeStatusModel>;
  onSubmit: (data: ChangeStatusModel) => void;
}

export const ChangeStatusView: React.FC<ChangeStatusViewProps> = ({ form, onSubmit }) => {
  const [_ChangeStatus, { isLoading }] = useChangeProblemStatusMutation({
    fixedCacheKey: 'changeStatus',
  });

  const { problemId: id } = useParams();
  const problemId = Number(id);

  const { data: problem } = useGetProblemForAdminQuery({ problemId });
  const {
    formState: { isValid },
    handleSubmit,
  } = form;

  const navigate = useNavigate();

  const handleEditProblem = () => {
    navigate(`/admin/problems/${problemId}/edit`);
  };

  return (
    <div className="h-full">
      <FormProvider {...form}>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Change Problem Status</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-col-2 gap-2">
                <ProblemStatusField />
                <Button
                  isActive={isValid}
                  variant="default"
                  type="submit"
                  isLoading={isLoading}
                  className="md:w-72 mx-auto"
                >
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex flex-row gap-5">
              <div className="col-span-1">
                <Typography variant="h2">
                  <b>{problem?.title}</b>
                </Typography>
              </div>
              <div>
                <TagBadges tags={problem?.tags ?? []} />
              </div>
              <div>
                <b>Difficulty: </b>
                {problem?.difficulty}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Card>
              <div className="flex flex-col w-full pl-4 items-left">
                <div>
                  <MarkdownView content={problem?.description ?? ''} />
                </div>
              </div>
            </Card>
            <div className="grid grid-row gap-2 mt-5">
              <Typography variant="h2">
                <b>Testcases</b>
              </Typography>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/2">Input</TableHead>
                    <TableHead className="w-1/2">Output</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow key={problem?.id || ''}>
                    <TableCell className="font-mono">
                      <pre>{problem?.testCasesInput}</pre>
                    </TableCell>
                    <TableCell className="font-mono flex">
                      <pre>{problem?.testCasesOutput}</pre>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <Button
            variant="default"
            onClick={handleEditProblem}
            className=" flex md:w-72 mx-auto mb-3"
          >
            Edit Problem
          </Button>
        </Card>
      </FormProvider>
    </div>
  );
};
