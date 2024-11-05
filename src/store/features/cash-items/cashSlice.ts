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
      console.log('in slice to add')
     
      const data = {...action.payload}
      console.log(data)
      
      if (state.cash) {
        state.cash.push(data);
      }
    },
    deleteCashItem: (state, action) => {
     
      console.log(JSON.stringify(state.cash, null, 2));
      if (state.cash) {
       
        state.cash = state.cash.filter((item) => item.cashId !== action.payload);
      console.log(JSON.stringify(state.cash, null, 2));

      }
    },
    updateCashItem: (state, action) => {
      console.log('updating cash item')
      console.log(action.payload)
      console.log('Current State:', JSON.stringify(state.cash, null, 2));

      if (state.cash) {
        console.log('in editing cash item')
        console.log('id in payload',action.payload.cashId)
        const index = state.cash.findIndex((item) => item.cashId === action.payload.cashId);
     
         console.log('index val',index)
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
