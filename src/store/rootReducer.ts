import { combineReducers } from '@reduxjs/toolkit';

import { apiSlice } from './features/api/apiSlice';
import auth from './features/auth/authSlice';
import items from './features/items/itemsSlice';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth,
  items,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
