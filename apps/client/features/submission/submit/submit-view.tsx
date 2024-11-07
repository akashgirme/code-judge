import { Controller, FormProvider, UseFormReturn } from 'react-hook-form';
import { CodeEditor } from '../../../components/code-editor';
import { SelectLanguageField } from '@code-judge/core-design';
import { CreateSubmissionModel } from './submit-logic';
import { Button, Card } from '@code-judge/ui';

interface CreateSubmissionViewProps {
  form: UseFormReturn<CreateSubmissionModel>;
  onSubmit: (data: CreateSubmissionModel) => void;
  isLoading: boolean;
}

export const CreateSubmissionView: React.FC<CreateSubmissionViewProps> = ({
  form,
  onSubmit,
  isLoading,
}) => {
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
          {/* <Controller
            name="language"
            control={control}
            render={({ field: { onChange, value } }) => <SelectLanguageField />}
          /> */}
          <SelectLanguageField />
          <Card className="h-full grid gap-1">
            <div>
              <CodeEditor
                language={selectedLanguage}
                defaultValue="//Code here"
                defaultLanguage="c"
                height="78vh"
              />
            </div>
            <div className="flex w-full">
              <Button
                isActive={isValid}
                variant="default"
                type="submit"
                isLoading={isLoading}
                className="md:w-72 mx-auto "
              >
                {isLoading ? 'Pending...' : 'Submit'}
              </Button>
              <Button
                isActive={isValid}
                variant="default"
                type="submit"
                isLoading={isLoading}
                className="md:w-72 mx-auto "
              >
                {isLoading ? 'Pending...' : 'Run'}
              </Button>
            </div>
          </Card>
        </div>
      </form>
    </FormProvider>
  );
};
