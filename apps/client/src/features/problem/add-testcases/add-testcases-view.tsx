'use client';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { AddTestCasesModel } from './add-testcases-logic';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Typography,
} from '@code-judge/ui';
import {
  useAddTestCasesToProblemMutation,
  useGetProblemQuery,
} from '@code-judge/api-client';
import {
  ProblemExpectedOutputField,
  ProblemInputTestCasesField,
} from '../components/form-fields';
import { useNavigate, useParams } from 'react-router-dom';
import { TagBadges } from '../components';

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

  const { data: problem } = useGetProblemQuery({ problemId });
  const {
    formState: { isValid },
    handleSubmit,
  } = form;

  const navigate = useNavigate();

  const handleSkip = () => {
    navigate('/admin/problems');
  };

  return (
    <div className="h-full">
      <FormProvider {...form}>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Add testcases to problem</CardTitle>
            <Typography variant="body1">
              {' '}
              <b>Name: </b>
              {problem?.title}
            </Typography>
            <Typography variant="h3">
              <b>Difficulty: </b>
              {problem?.difficulty}
            </Typography>
            <TagBadges tags={problem?.tags || []} />
            <Button variant="outline" onClick={handleSkip} className="w-[200px]">
              Skip
            </Button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-row-3 gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <ProblemInputTestCasesField />
                  </div>
                  <div className="col-span-1">
                    <ProblemExpectedOutputField />
                  </div>
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
    </div>
  );
};
