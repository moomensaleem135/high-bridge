import { IIncome } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  income: IIncome | null | undefined;
}

const initialState: IInitialState = {
  income: null,
};

const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    IncomeChoice: (state, action) => {
      state.income = action.payload;
    },
  },
});

export const { IncomeChoice } = incomeSlice.actions;

export default incomeSlice.reducer;
