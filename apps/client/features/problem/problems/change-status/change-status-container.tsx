'use client';
import { useChangeProblemStatusMutation } from '@code-judge/api-hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { handleError } from '../../../../utils';
import { ChangeProblemStatusModel, ChangeStatusLogic } from './change-status-logic';

export const ChangeProblemStatusContainer = () => {
  const navigate = useNavigate();
  const { problemId: id } = useParams();
  const problemId = Number(id);

  const [ChangeStatus] = useChangeProblemStatusMutation({
    fixedCacheKey: 'changeStatus',
  });

  const handleSubmit = async (data: ChangeProblemStatusModel) => {
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

  const defaultValues: ChangeProblemStatusModel = {
    remark: '',
    status: 'unpublished',
  };

  return <ChangeStatusLogic defaultValues={defaultValues} onSubmit={handleSubmit} />;
};
