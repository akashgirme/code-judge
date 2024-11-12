export const extractErrorMessages = (errors?: Record<string, string>) => {
  let errorMessages: string[] = [];
  if (!errors || !Object.keys(errors).length) return errorMessages;

  Object.keys(errors).forEach((key) => {
    if (Array.isArray(errors[key])) {
      errorMessages = errorMessages.concat(errors[key]);
    } else {
      errorMessages.push(errors[key]);
    }
  });

  return errorMessages;
};
