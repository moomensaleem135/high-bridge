import { combineReducers } from '@reduxjs/toolkit';

import { apiSlice } from './features/api/apiSlice';
import auth from './features/auth/authSlice';
import items from './features/items/golditemsSlice';
import sect from './features/sects/sectsSlice';
import setup from './features/setup/setupSlice';
import income from './features/income/incomeSlice';
import zakat from './features/zakat/zakatSlice';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth,
  items,
  sect,
  setup,
  income,
  zakat,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
