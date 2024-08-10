import { useParams, useRouter } from 'next/navigation';
import { CreatePostLogic, CreatePostModel } from '../create-problem/create-problem-logic';
import {
  revalidator,
  useGetPostQuery,
  useUpdatePostMutation,
} from '@skill-street-ui/auth-client';

export const EditPostContainer = () => {
  const router = useRouter();
  const { postId } = useParams();
  const { data, isSuccess } = useGetPostQuery({ postId });

  const [updatePost] = useUpdatePostMutation({
    fixedCacheKey: 'createPost',
  });

  const handleSubmit = async (data: CreatePostModel) => {
    console.log(data);
    const { id } = await updatePost({
      postId,
      createPostDto: {
        ...data,
        tagIds: data.tags.map((tag) => tag.value),
        keywords: data.keywords.split(','),
      },
    }).unwrap();
    revalidator(`post-${id}`);
    router.push(`/blog/posts/${id}`);
  };

  const defaultValues: CreatePostModel = {
    title: data?.title || '',
    topic: data?.topic || '',
    intro: data?.intro || '',
    summary: data?.summary || '',
    internalNotes: data?.internalNotes || '',
    categoryId: data?.category.id || '',
    tags: data?.tags.map((tag) => ({ value: tag.id, label: tag.name })) || [],
    keywords: data?.keywords.join(',') || '',
    content: data?.content || '',
    status: data?.status || 'unpublished',
    uploadedImage: {
      publicId: data?.coverImagePublicId ?? '',
      version: 0,
      signature: '',
    },
  };

  if (!isSuccess) return null;
  return <CreatePostLogic defaultValues={defaultValues} onSubmit={handleSubmit} />;
};
