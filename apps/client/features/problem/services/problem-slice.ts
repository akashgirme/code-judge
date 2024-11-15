import { createSlice } from '@reduxjs/toolkit';

interface ProblemState {}

const initialState: ProblemState = {};

export const problemSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
});

export const {} = problemSlice.actions;

export const problemReducer = problemSlice.reducer;
