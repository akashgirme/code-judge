import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Language,
  RunStatusResponseDto,
  SubmissionResponse,
  SubmitStatusResponseDto,
} from '@code-judge/api-hooks';

export interface SubmissionState {
  submission: SubmissionResponse | null;
  submissionId: number | null;
  submitResponse: SubmitStatusResponseDto | null;
  runResponse: RunStatusResponseDto | null;
  sourceCode: string | null;
  language: Language;
}

const initialState: SubmissionState = {
  submission: null,
  submissionId: null,
  submitResponse: null,
  runResponse: null,
  sourceCode: null,
  language: 'c',
};

export const submissionSlice = createSlice({
  name: 'submission',
  initialState,
  reducers: {
    setSourceCode: (state, action: PayloadAction<string>) => {
      state.sourceCode = action.payload;
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
    setSubmitResponse: (state, action: PayloadAction<SubmitStatusResponseDto>) => {
      state.submitResponse = action.payload;
    },
    removeSubmitResponse: (state) => {
      state.submitResponse = null;
    },
    setRunResponse: (state, action: PayloadAction<RunStatusResponseDto>) => {
      state.runResponse = action.payload;
    },
    removeRunResponse: (state) => {
      state.runResponse = null;
    },
    setSubmission: (state, action: PayloadAction<SubmissionResponse>) => {
      state.submission = action.payload;
    },
    removeSubmission: (state) => {
      state.submission = null;
    },
    setsubmissionId: (state, action: PayloadAction<number>) => {
      state.submissionId = action.payload;
    },
    removeSubmissionId: (state) => {
      state.submission = null;
    },
  },
});

export const {
  setSourceCode,
  setLanguage,
  setSubmitResponse,
  removeSubmitResponse,
  setRunResponse,
  removeRunResponse,
  setSubmission,
  removeSubmission,
  setsubmissionId,
  removeSubmissionId,
} = submissionSlice.actions;

export const submissionReducer = submissionSlice.reducer;
