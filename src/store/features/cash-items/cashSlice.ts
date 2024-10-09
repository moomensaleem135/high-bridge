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
  },
});

export const { addCashItems, deleteCashItem } = cashitemSlice.actions;

export default cashitemSlice.reducer;
