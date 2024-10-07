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
      console.log(JSON.stringify(state.items));
      if (state.items) {
        state.items.push(action.payload);
      }
    },
    deleteItem: (state, action) => {
      console.log('in delete item');
      console.log('payload', action.payload);
      console.log(state.items);
      if (state.items) {
        console.log(state.items);
        state.items = state.items.filter((item) => {
          item.id !== action.payload;
        });
      }
    },
  },
});

export const { addItems, deleteItem } = itemSlice.actions;

export default itemSlice.reducer;
