import { IItems } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  items: IItems[] | null | undefined;
  nextId: number;
}

const initialState: IInitialState = {
  items: [],
  nextId: 1,
};

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItems: (state, action) => {
      const newItem = { id: state.nextId, ...action.payload };
      if (state.items) {
        state.items.push(newItem);
        state.nextId += 1;
      }
    },
    deleteItem: (state, action) => {
      console.log('in delete item');
      console.log('payload', action.payload);
      console.log(state.items);
      if (state.items) {
        console.log(state.items);
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    updateItem: (state, action) => {
      const { id, updatedData } = action.payload;
      if (state.items) {
        const index = state.items.findIndex((item) => item.id === id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...updatedData };
        }
      }
    },
  },
});

export const { addItems, deleteItem, updateItem } = itemSlice.actions;

export default itemSlice.reducer;
