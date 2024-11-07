'use client';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { AddTestCasesModel } from './add-testcases-logic';
import { useAddTestCasesToProblemMutation } from '@code-judge/api-hooks';
import { useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ProblemTestCasesField,
} from '@code-judge/core-design';

interface AddTestCasesViewProps {
  form: UseFormReturn<AddTestCasesModel>;
  onSubmit: (data: AddTestCasesModel) => void;
}

export const AddTestCasesView: React.FC<AddTestCasesViewProps> = ({ form, onSubmit }) => {
  const [_addTestCases, { isLoading }] = useAddTestCasesToProblemMutation({
    fixedCacheKey: 'addTestCases',
  });

  const { problemId: id } = useParams();
  const problemId = Number(id);

  return (
    <FormProvider {...form}>
      <Card>
        <CardHeader>
          <CardTitle>{problemId ? 'Update' : 'Add'} Test Cases</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-9">
              <ProblemTestCasesField />
              <Button type="submit" isLoading={isLoading} className="md:w-72 mx-auto">
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
};
