import { FormProvider, UseFormReturn } from 'react-hook-form';
import { CreateTagModel } from './create-tag-logic';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  TagNameField,
} from '@code-judge/core-design';
import { useCreateTagMutation } from '@code-judge/api-hooks';
import { useParams } from 'next/navigation';

interface CreateTagViewProps {
  form: UseFormReturn<CreateTagModel>;
  onSubmit: (data: CreateTagModel) => void;
}

export const CreateTagView: React.FC<CreateTagViewProps> = ({ form, onSubmit }) => {
  const [_createTag, { isLoading }] = useCreateTagMutation({
    fixedCacheKey: 'createTag',
  });
  const { tagId } = useParams();

  return (
    <FormProvider {...form}>
      <Card>
        <CardHeader>
          <CardTitle>{tagId ? 'Update ' : 'Create '}tag</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <TagNameField />
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
