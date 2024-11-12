'use client';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
  PersistConfig,
  persistStore,
} from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer, apiQuery as api, UserRole } from '@code-judge/api-hooks';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import { ability, defineAbilityForUser } from '../features/auth/ability/ability-factory';
// import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/query';
import { submissionReducer } from '../features/submission';
import { problemReducer } from '../features/problem/services';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

// export default storage;

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  submission: submissionReducer,
  problem: problemReducer,
});

const accessTokenBlackListFilter = createBlacklistFilter('auth', ['accessToken']);

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  transforms: [accessTokenBlackListFilter],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// Custom typesafe hooks for useDispatch and useSelector
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//persist redux store in localStorage to use across sessions.
export const persistor = persistStore(store);

let lastUserRole: UserRole;

store.subscribe(() => {
  const currentUserRole = store.getState().auth?.user?.role;

  if (currentUserRole && currentUserRole !== lastUserRole) {
    ability.update(defineAbilityForUser(currentUserRole).rules);
    console.log('User role changed: ', currentUserRole);
    lastUserRole = currentUserRole;
  }
});
