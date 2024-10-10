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
      console.log('in cash items')
      const data = {...action.payload}
      console.log(data);
    
      if (state.cash) {
        state.cash.push(data);
      }
    },
    deleteCashItem: (state, action) => {
      console.log('in delete item');
      console.log('payload', action.payload);
      console.log(JSON.stringify(state.cash, null, 2));
      if (state.cash) {
        console.log(state.cash);
        state.cash = state.cash.filter((item) => item.cashId !== action.payload);
      console.log(JSON.stringify(state.cash, null, 2));

      }
    },
    updateCashItem: (state, action) => {
      console.log('in update cash item');
      console.log('payload', action.payload);
      console.log('id', action.payload.cashId);
      console.log('Current State:', JSON.stringify(state.cash, null, 2));

      if (state.cash) {
        const index = state.cash.findIndex((item) => item.cashId === action.payload.cashId);
        console.log('index', index);
        if (index !== -1) {
          // Update the existing item with the new data
          state.cash[index] = { ...state.cash[index], ...action.payload };
        }
      }
    },
  },
});

export const { addCashItems, deleteCashItem, updateCashItem } = cashitemSlice.actions;

export default cashitemSlice.reducer;
