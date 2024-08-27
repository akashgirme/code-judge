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
import { authReducer, apiQuery as api, UserRole } from '@code-judge/api-client';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import { ability, defineAbilityForUser } from '../features/auth/ability/ability-factory';
import storage from 'redux-persist/lib/storage';
import { submissionReducer } from '../features/submission/submissionSlice';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  submission: submissionReducer,
});

//TODO: Uncomment this when refresh-token is able to store
//because if there is no refresh token then session won't refresh and if we lost authToken then have to login again to get it.
// const accessTokenBlackListFilter = createBlacklistFilter('auth', ['accessToken']);

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  // transforms: [accessTokenBlackListFilter],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const reducers = {
//   [api.reducerPath]: api.reducer,
//   auth: authReducer,
// };

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

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
