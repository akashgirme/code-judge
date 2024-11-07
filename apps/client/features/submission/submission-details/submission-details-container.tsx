import React from 'react';
import { SubmissionDetailsView } from './submissions-details-view';
import { SubmissionDto } from '@code-judge/api-hooks';
import { useAppDispatch } from '../../../app/store';
import { removeSubmission } from '../services/submission-slice';

interface SubmissionDetailsContainerProps {
  submission: SubmissionDto;
  handleOnBack: () => void;
}

export const SubmissionDetailsContainer: React.FC<SubmissionDetailsContainerProps> = ({
  submission,
  handleOnBack,
}) => {
  return <SubmissionDetailsView submission={submission} handleOnBack={handleOnBack} />;
};
