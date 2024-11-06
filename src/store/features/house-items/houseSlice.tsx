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
      console.log('in house slice to add');

      const data = { ...action.payload };
      console.log(data);

      if (state.house) {
        state.house.push(data);
      }
    },

    deleteHouseItem: (state, action) => {
      console.log('in delete house');
      console.log(action.payload);
      console.log(JSON.stringify(state.house, null, 2));
      if (state.house) {
        state.house = state.house.filter(
          (item) => item.houseId !== action.payload
        );
        console.log(JSON.stringify(state.house, null, 2));
      }
    },

    updateHouseItem: (state, action) => {
      console.log('updating house item');
      console.log(action.payload);
      console.log('Current State:', JSON.stringify(state.house, null, 2));

      if (state.house) {
        console.log('in editing house item');
        console.log('id in payload', action.payload.houseId);
        const index = state.house.findIndex(
          (item) => item.houseId === action.payload.houseId
        );

        console.log('index val', index);
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
