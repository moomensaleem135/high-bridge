import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  prevItem: string | null | undefined;
}

const initialState: IInitialState = {
  prevItem: '',
};

const previtemSlice = createSlice({
  name: 'prevItem',
  initialState,
  reducers: {
    setPrevItem: (state, action) => {
      state.prevItem = action.payload;
    },
  },
});

export const { setPrevItem } = previtemSlice.actions;

export default previtemSlice.reducer;
