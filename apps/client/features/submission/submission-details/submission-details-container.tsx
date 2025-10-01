import React from 'react';
import { SubmissionDetailsView } from './submissions-details-view';
import { SubmissionResponse } from '@algo-forge/api-hooks';

interface SubmissionDetailsContainerProps {
  submission: SubmissionResponse;
  handleOnBack: () => void;
}

export const SubmissionDetailsContainer: React.FC<SubmissionDetailsContainerProps> = ({
  submission,
  handleOnBack,
}) => {
  return <SubmissionDetailsView submission={submission} handleOnBack={handleOnBack} />;
};
