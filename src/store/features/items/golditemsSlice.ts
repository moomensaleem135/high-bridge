import { GoldIItems } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit';


interface IInitialState {
  items: GoldIItems[] | null | undefined;
}

const initialState: IInitialState = {
  items: [], // Initialize with an empty array
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
     
      console.log('Current State:', JSON.stringify(state.items, null, 2));

      if (state.items) {
        // Update state.items with the filtered array
        state.items = state.items.filter((item) => item.goldId !== action.payload);
      
      }
    },
    updateItem: (state, action) => {
     
      console.log('Current State:', JSON.stringify(state.items, null, 2));

      if (state.items) {
        
        const index = state.items.findIndex((item) => item.goldId === action.payload.goldId);
      
        if (index !== -1) {
          // Update the existing item with the new data
          state.items[index] = { ...state.items[index], ...action.payload };
        }
      }
    },
  },
});

export const { addItems, deleteItem, updateItem } = golditemSlice.actions;

export default golditemSlice.reducer;
