import { BaseQueryApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthState, logout, setCredentials } from '../auth/authSlice';
import { RefreshedSessionDto } from '../api/api-query';
import { paramsSerializer } from './param-serializer';

type RootAuthState = { auth: AuthState };

const baseQuery = fetchBaseQuery({
  //TODO: Read from `env `
  baseUrl: 'http://localhost:3000',
  // baseUrl: import.meta.env.VITE_API_SERVER_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootAuthState).auth.accessToken;
    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
  paramsSerializer,
});

let isRefreshing = false;
let refreshPromise: Promise<string | null>;
export const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  let result = await baseQuery(args, api, extraOptions);

  console.log(result);

  if (result.error && result.error.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = refreshAccessToken(api, extraOptions)
        .then((newToken) => {
          isRefreshing = false;
          return newToken;
        })
        .catch(() => {
          isRefreshing = false;
          return null;
        });
    }

    const newAccessToken = await refreshPromise;
    if (newAccessToken) {
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};
const refreshAccessToken = async (api: BaseQueryApi, extraOptions: object) => {
  const { data } = await baseQuery(
    { url: '/api/auth/refresh', method: 'GET' },
    api,
    extraOptions
  );

  const accessToken = (data as RefreshedSessionDto)?.accessToken ?? null;
  const user = (api.getState() as RootAuthState).auth.user;

  if (accessToken && user) {
    api.dispatch(setCredentials({ user, accessToken }));
    return accessToken;
  } else {
    api.dispatch(logout());
    // window.location.href = '/auth/sign-in';
    return null;
  }
};
