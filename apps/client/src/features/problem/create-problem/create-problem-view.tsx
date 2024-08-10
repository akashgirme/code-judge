'use client';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { CreateProblemModel } from './create-problem-logic';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@code-judge/ui';
import { useCreateProblemMutation } from '@code-judge/api-client';
import { useParams } from 'react-router-dom';
import {
  ProblemDescriptionField,
  ProblemDifficultyField,
  ProblemExpectedOutputField,
  ProblemInputTestCasesField,
  ProblemInternalNotesField,
  ProblemSolutionField,
  ProblemSolutionLangaugeField,
  ProblemTitleField,
  ProblemTopicsField,
} from '../components/form-fields';

interface CreateProblemViewProps {
  form: UseFormReturn<CreateProblemModel>;
  onSubmit: (data: CreateProblemModel) => void;
}

export const CreateProblemView: React.FC<CreateProblemViewProps> = ({
  form,
  onSubmit,
}) => {
  const [_createProblem, { isLoading }] = useCreateProblemMutation({
    fixedCacheKey: 'createProblem',
  });
  const {
    formState: { isValid },
    handleSubmit,
  } = form;
  const { problemId } = useParams();

  return (
    <FormProvider {...form}>
      <Card>
        <CardHeader>
          <CardTitle>{problemId ? 'Update' : 'Create'} Problem</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-row-3 gap-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-2">
                  <ProblemTitleField />
                </div>
                <div className="col-span-1 flex justify-evenly flex-wrap gap-5 ">
                  <ProblemTopicsField />
                </div>
                <div className="col-span-1">
                  <ProblemDifficultyField />
                </div>
              </div>
              <div className="col-span-1 h-full">
                <div>
                  <ProblemDescriptionField />
                </div>
              </div>
              <div className=" w-1/4 ">
                <ProblemSolutionLangaugeField />
              </div>
              <div>
                <ProblemSolutionField />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <ProblemInputTestCasesField />
                </div>
                <div className="col-span-1">
                  <ProblemExpectedOutputField />
                </div>
              </div>
              <div>
                <ProblemInternalNotesField />
              </div>
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
  );
};
