'use client';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@code-judge/ui';
import {
  useChangeProblemStatusMutation,
  useGetProblemForAdminQuery,
} from '@code-judge/api-hooks';
import { useParams } from 'react-router-dom';
import { ChangeProblemStatusModel } from './change-status-logic';
import { ProblemRemarksField, ProblemStatusField } from '@code-judge/core-design';

interface ChangeProblemStatusViewProps {
  form: UseFormReturn<ChangeProblemStatusModel>;
  onSubmit: (data: ChangeProblemStatusModel) => void;
}

export const ChangeProblemStatusView: React.FC<ChangeProblemStatusViewProps> = ({
  form,
  onSubmit,
}) => {
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
                <ProblemRemarksField />
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
      </FormProvider>
    </div>
  );
};
