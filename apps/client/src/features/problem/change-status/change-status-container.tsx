'use client';
import { useChangeProblemStatusMutation } from '@code-judge/api-client';
import { useNavigate, useParams } from 'react-router-dom';
import { handleError } from '../../../utils';
import { ChangeStatusLogic, ChangeStatusModel } from './change-status-logic';

export const ChangeStatusContainer = () => {
  const navigate = useNavigate();
  const { problemId: id } = useParams();
  const problemId = Number(id);

  const [ChangeStatus] = useChangeProblemStatusMutation({
    fixedCacheKey: 'changeStatus',
  });

  const handleSubmit = async (data: ChangeStatusModel) => {
    try {
      await ChangeStatus({
        problemId,
        changeProblemStatusDto: {
          ...data,
        },
      }).unwrap();
      navigate(`/admin/problems`);
    } catch (error) {
      handleError(error as Error);
    }
  };

  const defaultValues: ChangeStatusModel = {
    status: 'unpublished',
  };

  return <ChangeStatusLogic defaultValues={defaultValues} onSubmit={handleSubmit} />;
};
