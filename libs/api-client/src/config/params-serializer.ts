// Custom paramsSerializer function for query parameter serialization
export const paramsSerializer = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();

  for (const key in params) {
    const value = params[key];
    if (Array.isArray(value)) {
      // Serialize arrays with the '[]' notation
      value.forEach((item) => {
        searchParams.append(`${key}[]`, item);
      });
    } else {
      // Serialize other values
      if (value) {
        searchParams.append(key, value);
      }
    }
  }

  return searchParams.toString();
};
