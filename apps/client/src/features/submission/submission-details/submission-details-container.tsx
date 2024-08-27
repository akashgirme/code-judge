import React from 'react';
import { SubmissionDetailsView } from './submissions-details-view';
import { SubmissionDto } from '@code-judge/api-client';
import { useAppDispatch } from '../../../app/store';
import { removeSubmission } from '../submissionSlice';

interface SubmissionDetailsContainerProps {
  submission: SubmissionDto;
}

export const SubmissionDetailsContainer: React.FC<SubmissionDetailsContainerProps> = ({
  submission,
}) => {
  const dispatch = useAppDispatch();
  const handleOnBack = () => {
    dispatch(removeSubmission());
  };
  return <SubmissionDetailsView submission={submission} handleOnBack={handleOnBack} />;
};
