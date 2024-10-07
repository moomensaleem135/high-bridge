import { IZakat } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  zakat: IZakat;
}

const initialState: IInitialState = {
  zakat: {
    quantity: 0,
    weight: '',
    value: 0,
  },
};

const zakatSlice = createSlice({
  name: 'zakat',
  initialState,
  reducers: {
    zakatCal: (state, action) => {
      state.zakat.quantity = action.payload.quantity;
      state.zakat.weight = action.payload.weight;

      state.zakat.value = 10 * 20;
      console.log('zakat', state.zakat.value);
    },
  },
});

export const { zakatCal } = zakatSlice.actions;

export default zakatSlice.reducer;
