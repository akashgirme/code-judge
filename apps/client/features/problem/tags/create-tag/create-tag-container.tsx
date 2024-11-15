import { useRouter } from 'next/navigation';
import { CreateTagLogic, CreateTagModel } from './create-tag-logic';
import { useCreateTagMutation } from '@code-judge/api-hooks';
import { handleError } from 'apps/client/utils';

export const CreateTagContainer = () => {
  const router = useRouter();

  const [createTag] = useCreateTagMutation({
    fixedCacheKey: 'createTag',
  });

  const handleSubmit = async (data: CreateTagModel) => {
    await createTag({
      createTagDto: {
        ...data,
      },
    })
      .unwrap()
      .then(() => {
        router.push(`/admin/problems/tags`);
      })
      .catch(handleError);
  };

  const defaultValues: CreateTagModel = {
    tagName: '',
  };

  return <CreateTagLogic defaultValues={defaultValues} onSubmit={handleSubmit} />;
};
