import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer, apiQuery as api } from '@code-judge/api-client';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

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

// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { setupListeners } from '@reduxjs/toolkit/query';
// import {
//   persistReducer,
//   persistStore,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import { UserRole, authReducer, apiQuery as api } from '@code-judge/api-client';
// import storage from 'redux-persist/lib/storage';
// import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// import { createBlacklistFilter } from 'redux-persist-transform-filter';
// import { ability, defineAbilityForUser } from '../features/auth/ability/ability-factory';

// const accessTokenBlackListFilter = createBlacklistFilter('auth', ['accessToken']);

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['auth'],
//   transforms: [accessTokenBlackListFilter],
// };

// const rootReducer = combineReducers({
//   [api.reducerPath]: api.reducer,
//   auth: authReducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }).concat(api.middleware),
// });

// setupListeners(store.dispatch);

// export type RootState = ReturnType<typeof rootReducer>;

// export type AppDispatch = typeof store.dispatch;

// export const useAppDispatch: () => AppDispatch = useDispatch;

// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export const persistor = persistStore(store);

// let lastUserRole: UserRole;

// store.subscribe(() => {
//   const currentUserRole = store.getState().auth?.user?.role;

//   if (currentUserRole && currentUserRole !== lastUserRole) {
//     ability.update(defineAbilityForUser(currentUserRole).rules);
//     console.log('User role changed: ', currentUserRole);
//     lastUserRole = currentUserRole;
//   }
// });
