'use client';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Typography,
} from '@code-judge/ui';
import {
  useChangeProblemStatusMutation,
  useGetProblemForAdminQuery,
} from '@code-judge/api-client';
import { ProblemStatusField } from '../components/form-fields';
import { useParams } from 'react-router-dom';
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
            <div className="flex flex-col w-full pl-4 items-left">
              <div>
                <MarkdownView content={problem?.description ?? ''} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-1">
                <p>
                  <pre>{problem?.testCasesInput}</pre>
                </p>
              </div>
              <div className="col-span-1">
                <p>
                  <pre>{problem?.testCasesOutput}</pre>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </FormProvider>
    </div>
  );
};
