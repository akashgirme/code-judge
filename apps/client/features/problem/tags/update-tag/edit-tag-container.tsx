'use client';
import { useParams, useRouter } from 'next/navigation';
import { CreateTagLogic, CreateTagModel } from '../create-tag/create-tag-logic';
import { useGetTagQuery, useUpdateTagMutation } from '@code-judge/api-hooks';

export const EditTagContainer = () => {
  const router = useRouter();
  const { tagId } = useParams();
  const tgId = parseInt(Array.isArray(tagId) ? tagId[0] : tagId, 10);
  const { data, isSuccess } = useGetTagQuery({ tagId: tgId });

  const [updateTag] = useUpdateTagMutation({
    fixedCacheKey: 'createTag',
  });

  const handleSubmit = async (data: CreateTagModel) => {
    console.log(data);
    await updateTag({
      tagId: tgId,
      createTagDto: {
        ...data,
      },
    }).unwrap();
    router.push(`/admin/problems/tags`);
  };

  const defaultValues: CreateTagModel = {
    tagName: data?.name || '',
  };

  if (!isSuccess) return null;

  return <CreateTagLogic defaultValues={defaultValues} onSubmit={handleSubmit} />;
};
