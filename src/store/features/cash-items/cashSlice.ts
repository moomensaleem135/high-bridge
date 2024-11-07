import { CashIItems } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  cash: CashIItems[] | null | undefined;
}

const initialState: IInitialState = {
  cash: [],
};

const cashitemSlice = createSlice({
  name: 'cashitems',
  initialState,
  reducers: {
    addCashItems: (state, action) => {
      const data = { ...action.payload };
      if (state.cash) {
        state.cash.push(data);
      }
    },
    deleteCashItem: (state, action) => {
      if (state.cash) {
        state.cash = state.cash.filter(
          (item) => item.cashId !== action.payload
        );
      }
    },
    updateCashItem: (state, action) => {
      if (state.cash) {
        const index = state.cash.findIndex(
          (item) => item.cashId === action.payload.cashId
        );
        if (index !== -1) {
          // Update the existing item with the new data
          state.cash[index] = { ...state.cash[index], ...action.payload };
        }
      }
    },
  },
});

export const { addCashItems, deleteCashItem, updateCashItem } =
  cashitemSlice.actions;

export default cashitemSlice.reducer;
