import { ProblemDetailContainer } from 'apps/client/features/problem';

const ProblemDetailScreen = ({ params }: { params: { problemId?: number } }) => {
  return <ProblemDetailContainer problemId={params.problemId || 1} />;
};

export default ProblemDetailScreen;
