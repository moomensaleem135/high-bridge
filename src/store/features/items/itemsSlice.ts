import { IItems } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  items: IItems[] | null | undefined;
}

const initialState: IInitialState = {
  items: [],
};

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItems: (state, action) => {
      console.log('in add');
      console.log(action.payload);
      if (state.items) {
        state.items.push(action.payload);
      }
    },
  },
});

export const { addItems } = itemSlice.actions;

export default itemSlice.reducer;
