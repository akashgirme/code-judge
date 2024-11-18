// 'use client';
// import { useParams } from 'next/navigation';
// import { AllSubmissionsView } from './all-submissions-view';
// import { useGetSubmissionByIdQuery, useGetSubmissionsQuery } from '@code-judge/api-hooks';
// import { SubmissionDetailsContainer } from '../submission-details';
// import { removeSubmission, removeSubmissionId, setSubmission } from '../services';
// import { useAppDispatch, useAppSelector } from 'apps/client/app/store';

// export const AllSubmissionsContainer = () => {
//   const { problemId: id } = useParams();
//   const problemId = Number(id);

//   const dispatch = useAppDispatch();
//   const { submissionId, submission } = useAppSelector((state) => state.submission);

//   const { data, isFetching } = useGetSubmissionsQuery({
//     problemId,
//   });

//   const { data: submissionDetails, isLoading: getSubmissionIsLoading } =
//     useGetSubmissionByIdQuery(
//       { submissionId: submissionId ?? 0 },
//       { skip: submissionId === null }
//     );

//   if (submissionDetails && submissionId !== null && !getSubmissionIsLoading) {
//     dispatch(setSubmission(submissionDetails));
//     dispatch(removeSubmissionId());
//   }

//   const handleOnBack = () => {
//     dispatch(removeSubmission(), removeSubmissionId());
//   };

//   if (submission) {
//     return (
//       <SubmissionDetailsContainer submission={submission} handleOnBack={handleOnBack} />
//     );
//   }

//   return <AllSubmissionsView data={data ?? []} isFetching={isFetching} />;
// };

'use client';
import { useParams } from 'next/navigation';
import { useEffect } from 'react'; // Add this import
import { AllSubmissionsView } from './all-submissions-view';
import { useGetSubmissionByIdQuery, useGetSubmissionsQuery } from '@code-judge/api-hooks';
import { SubmissionDetailsContainer } from '../submission-details';
import { removeSubmission, removeSubmissionId, setSubmission } from '../services';
import { useAppDispatch, useAppSelector } from 'apps/client/app/store';

export const AllSubmissionsContainer = () => {
  const { problemId: id } = useParams();
  const problemId = Number(id);

  const dispatch = useAppDispatch();
  const { submissionId, submission } = useAppSelector((state) => state.submission);

  const { data, isFetching } = useGetSubmissionsQuery({
    problemId,
  });

  const { data: submissionDetails, isLoading: getSubmissionIsLoading } =
    useGetSubmissionByIdQuery(
      { submissionId: submissionId ?? 0 },
      { skip: submissionId === null }
    );

  useEffect(() => {
    if (submissionDetails && submissionId !== null && !getSubmissionIsLoading) {
      dispatch(setSubmission(submissionDetails));
      dispatch(removeSubmissionId());
    }
  }, [submissionDetails, submissionId, getSubmissionIsLoading, dispatch]);

  const handleOnBack = () => {
    dispatch(removeSubmission());
    dispatch(removeSubmissionId());
  };

  if (submission) {
    return (
      <SubmissionDetailsContainer submission={submission} handleOnBack={handleOnBack} />
    );
  }

  return <AllSubmissionsView data={data ?? []} isFetching={isFetching} />;
};
