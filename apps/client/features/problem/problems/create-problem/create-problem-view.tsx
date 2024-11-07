'use client';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { CreateProblemModel } from './create-problem-logic';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ProblemDescriptionField,
  ProblemDifficultyField,
  ProblemRemarksField,
  ProblemStatusField,
  ProblemTagsField,
  ProblemTestCasesField,
  ProblemTitleField,
} from '@code-judge/core-design';
import { useCreateProblemMutation } from '@code-judge/api-hooks';
import { useParams } from 'next/navigation';
import { Can } from 'apps/client/features/auth/ability/Can';
import { Action, Subject } from 'apps/client/features/auth/ability/ability-factory';

interface CreateProblemViewProps {
  form: UseFormReturn<CreateProblemModel>;
  onSubmit: (data: CreateProblemModel) => void;
}

export const CreateProblemView: React.FC<CreateProblemViewProps> = ({
  form,
  onSubmit,
}) => {
  const [_createPost, { isLoading }] = useCreateProblemMutation({
    fixedCacheKey: 'createProblem',
  });
  const { problemId } = useParams();
  return (
    <FormProvider {...form}>
      <Card>
        <CardHeader>
          <CardTitle>{problemId ? 'Update' : 'Create'} Problem</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-9">
              <ProblemTitleField />
              <div className="flex justify-evenly flex-wrap gap-5 ">
                <div className=" w-1/4 ">
                  <ProblemTagsField />
                </div>
                <div className="w-1/4 ">
                  <ProblemDifficultyField />
                </div>
                <Can I={Action.Publish} a={Subject.Problem}>
                  {problemId && (
                    <div className=" w-1/4 ">
                      <ProblemStatusField />
                    </div>
                  )}
                </Can>
              </div>
              <ProblemDescriptionField />
              <ProblemRemarksField />
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
