import { HouseIItems } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  house: HouseIItems[] | null | undefined;
}

const initialState: IInitialState = {
  house: [],
};

const houseitemSlice = createSlice({
  name: 'houseitems',
  initialState,
  reducers: {
    addHouseItems: (state, action) => {
      const data = { ...action.payload };

      if (state.house) {
        state.house.push(data);
      }
    },

    deleteHouseItem: (state, action) => {
      if (state.house) {
        state.house = state.house.filter(
          (item) => item.houseId !== action.payload
        );
      }
    },

    updateHouseItem: (state, action) => {
      if (state.house) {
        const index = state.house.findIndex(
          (item) => item.houseId === action.payload.houseId
        );

        if (index !== -1) {
          // Update the existing item with the new data
          state.house[index] = { ...state.house[index], ...action.payload };
        }
      }
    },
  },
});

export const { addHouseItems, deleteHouseItem, updateHouseItem } =
  houseitemSlice.actions;

export default houseitemSlice.reducer;
