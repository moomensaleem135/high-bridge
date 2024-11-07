import { GoldIItems } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  items: GoldIItems[] | null | undefined;
}

const initialState: IInitialState = {
  items: [],
};

const golditemSlice = createSlice({
  name: 'golditems',
  initialState,
  reducers: {
    addItems: (state, action) => {
      const data = { ...action.payload };
      if (state.items) {
        state.items.push(data);
      }
    },
    deleteItem: (state, action) => {
      if (state.items) {
        state.items = state.items.filter(
          (item) => item.goldId !== action.payload
        );
      }
    },
    updateItem: (state, action) => {
      if (state.items) {
        const index = state.items.findIndex(
          (item) => item.goldId === action.payload.goldId
        );
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload };
        }
      }
    },
  },
});

export const { addItems, deleteItem, updateItem } = golditemSlice.actions;

export default golditemSlice.reducer;
