import { API } from '@skill-street-ui/auth-client';
import { PostDetailView } from './post-detail-view';
import { Suspense } from 'react';

export const PostDetailContainer = async ({ postId }: { postId: string }) => {
  const response = await API.getPostByPostId({ postId });
  if (!response.data || !response.success || response.error)
    return <>no data</>;
  return (
    <Suspense fallback={<>Loading</>}>
      <PostDetailView data={response.data} />
    </Suspense>
  );
};
