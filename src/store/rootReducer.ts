import { combineReducers } from '@reduxjs/toolkit';

import { apiSlice } from './features/api/apiSlice';
import auth from './features/auth/authSlice';
import items from './features/items/golditemsSlice';
import cash from './features/cash-items/cashSlice';
import sect from './features/sects/sectsSlice';
import setup from './features/setup/setupSlice';
import income from './features/income/incomeSlice';
import zakat from './features/zakat/zakatSlice';
import selection from './features/selection/selectionSlice';
import house from './features/house-items/houseSlice';
import prevItem from './features/prev-item/prevItemSlice';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth,
  items,
  sect,
  setup,
  income,
  zakat,
  cash,
  selection,
  house,
  prevItem,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
