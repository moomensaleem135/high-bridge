import { ISects } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  sect: ISects | null | undefined;
}

const initialState: IInitialState = {
  sect: null,
};

const itemSlice = createSlice({
  name: 'sect',
  initialState,
  reducers: {
    addSect: (state, action) => {
      state.sect = action.payload;
    },
  },
});

export const { addSect } = itemSlice.actions;

export default itemSlice.reducer;
