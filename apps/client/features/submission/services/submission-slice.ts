import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Language,
  RunStatusResponseDto,
  SubmitStatusResponseDto,
} from '@code-judge/api-hooks';

export interface SubmissionState {
  submitResponse: SubmitStatusResponseDto | null;
  runResponse: RunStatusResponseDto | null;
  sourceCode: string | null;
  language: Language;
}

const initialState: SubmissionState = {
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
      console.log('From reducer:', action.payload);
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
  },
});

export const {
  setSourceCode,
  setLanguage,
  setSubmitResponse,
  removeSubmitResponse,
  setRunResponse,
  removeRunResponse,
} = submissionSlice.actions;

export const submissionReducer = submissionSlice.reducer;
