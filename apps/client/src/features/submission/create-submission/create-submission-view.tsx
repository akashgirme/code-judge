import { Controller, FormProvider, UseFormReturn } from 'react-hook-form';
import { CodeEditor } from '../../../components/code-editor';
import { LanguageSelectField } from '../components/langauge-select/language-select-field';
import { useCreateSubmissionMutation } from '@code-judge/api-client';
import { CreateSubmissionModel } from './create-submission-logic';
import { Button } from '@code-judge/ui';

interface CreateSubmissionViewProps {
  form: UseFormReturn<CreateSubmissionModel>;
  onSubmit: (data: CreateSubmissionModel) => void;
}

export const CreateSubmissionView: React.FC<CreateSubmissionViewProps> = ({
  form,
  onSubmit,
}) => {
  const [_createSubmission, { isLoading }] = useCreateSubmissionMutation({
    fixedCacheKey: 'createProblem',
  });
  const {
    formState: { isValid },
    handleSubmit,
    control,
    watch,
  } = form;
  const selectedLanguage = watch('language');
  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
        <div className="grid gap-1">
          <Controller
            name="language"
            control={control}
            render={({ field: { onChange, value } }) => (
              <LanguageSelectField onChange={onChange} value={value} />
            )}
          />
          <div>
            <CodeEditor language={selectedLanguage} />
          </div>
          <div>
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
        </div>
      </form>
    </FormProvider>
  );
};
