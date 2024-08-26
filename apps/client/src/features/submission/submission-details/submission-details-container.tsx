import React from 'react';
import { SubmissionDetailsView } from './submissions-details-view';
import { SubmissionDto } from '@code-judge/api-client';

interface SubmissionDetailsContainerProps {
  submission: SubmissionDto;
  onBack: any;
}

export const SubmissionDetailsContainer: React.FC<SubmissionDetailsContainerProps> = ({
  submission,
  onBack,
}) => {
  return <SubmissionDetailsView submission={submission} onBack={onBack} />;
};
