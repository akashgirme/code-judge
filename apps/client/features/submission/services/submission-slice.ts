import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SubmissionDto } from '@code-judge/api-hooks';

export interface SubmissionState {
  submission: SubmissionDto | null;
}

const initialState: SubmissionState = {
  submission: null,
};

export const submissionSlice = createSlice({
  name: 'submission',
  initialState,
  reducers: {
    setSubmission: (state, action: PayloadAction<SubmissionDto>) => {
      state.submission = action.payload;
    },
    removeSubmission: (state) => {
      state.submission = null;
    },
  },
});

export const { setSubmission, removeSubmission } = submissionSlice.actions;

export const submissionReducer = submissionSlice.reducer;
