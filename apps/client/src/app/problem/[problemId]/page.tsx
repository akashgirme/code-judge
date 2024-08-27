import { withAuth } from '../../../features/auth/hooks';
import { SubmissionPanelContainer } from '../../../features/submission-panel';

const ProblemDetailScreen = () => {
  return <SubmissionPanelContainer />;
};

export default withAuth(ProblemDetailScreen);
