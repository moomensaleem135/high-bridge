import { ISetup } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  setup: ISetup;
}

const initialState: IInitialState = {
  setup: {
    startDate: '',
    endDate: '',
    year: '',
    month: '',
  },
};

const setupSlice = createSlice({
  name: 'setup',
  initialState,
  reducers: {
    profileData: (state, action) => {
      console.log('in add');
      const data = action.payload.setupData;
      if (data) {
        state.setup.startDate = data.startDate;
        state.setup.endDate = data.endDate;
        state.setup.year = data.year;
        state.setup.month = data.month;
      }
    },
  },
});

export const { profileData } = setupSlice.actions;

export default setupSlice.reducer;
