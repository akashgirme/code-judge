import { z } from 'zod';

export const questionConfig = {
  label: 'Enter Tag Name',
};

export const modelKey = 'tagName';

export const tagNameValidations = {
  [modelKey]: z
    .string()
    .regex(/^[a-zA-Z\s]*$/,{message:"Only letters and spaces are allowed!"})
    .min(4, { message: 'Tag Name must be 4 or more characters long' })
    .max(64,{message:"Tag Name must not be more than 64 characters."})
    ,
};
