'use client';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { CreateProblemModel } from './create-problem-logic';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@code-judge/ui';
import { useCreateProblemMutation } from '@code-judge/api-client';
import { useParams } from 'react-router-dom';
import {
  ProblemDescriptionField,
  ProblemDifficultyField,
  ProblemTitleField,
  ProblemTagsField,
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
    formState: { isValid, submitCount, errors },
    handleSubmit,
    getValues,
  } = form;

  const printFormData = () => {
    const currentData = getValues();
    console.log('Current Form Data:', currentData);
    console.log('Submit count', submitCount);
    console.log(isValid);
    console.log(errors);
  };

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
                  <ProblemTagsField />
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
              <Button
                isActive={isValid}
                variant="default"
                type="submit"
                isLoading={isLoading}
                className="md:w-72 mx-auto"
                onClick={printFormData}
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
