import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer, apiQuery as api, UserRole } from '@code-judge/api-client';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ability, defineAbilityForUser } from '../features/auth/ability/ability-factory';

const rootReducer = combineReducers({
  auth: authReducer,
});

const reducers = {
  [api.reducerPath]: api.reducer,
  auth: authReducer,
};

export const store = configureStore({
  reducer: reducers,
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

let lastUserRole: UserRole;

store.subscribe(() => {
  const currentUserRole = store.getState().auth?.user?.role;

  if (currentUserRole && currentUserRole !== lastUserRole) {
    ability.update(defineAbilityForUser(currentUserRole).rules);
    console.log('User role changed: ', currentUserRole);
    lastUserRole = currentUserRole;
  }
});
