import { ISelection } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  selection: ISelection | null | undefined | string ;
}

const initialState: IInitialState = {
    selection : '',
};

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    userSelection: (state, action) => {
        console.log('in sellect slice', action.payload)
      state.selection = action.payload;
    },
  },
});

export const { userSelection } = selectionSlice.actions;

export default selectionSlice.reducer;
