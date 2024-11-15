import { apiQuery as baseAuthApi } from './api-query';

export const apiQuery = baseAuthApi.enhanceEndpoints({
  addTagTypes: ['profile'],
  endpoints: {
    whoAmI: {
      providesTags: ['profile'],
    },
    onboard: {
      invalidatesTags: ['profile'],
    },
    editProfile: {
      invalidatesTags: ['profile'],
    },
  },
});
