import { ISetup } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  setup: ISetup;
}

const initialState: IInitialState = {
  setup: {
    startDate: '',
    year: '',
    religion: '',
  },
};

const setupSlice = createSlice({
  name: 'setup',
  initialState,
  reducers: {
    profileData: (state, action) => {
      const data = action.payload.setupData;
      if (data) {
        state.setup.startDate = data.startDate;
        state.setup.year = data.year;
        state.setup.religion = data.religion;
      }
    },
  },
});

export const { profileData } = setupSlice.actions;

export default setupSlice.reducer;
