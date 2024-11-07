import { IZakat } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  zakat: IZakat[];
  totalValue: number;
}

const initialState: IInitialState = {
  zakat: [],
  totalValue: 0,
};

const zakatSlice = createSlice({
  name: 'zakat',
  initialState,
  reducers: {
    zakatCal: (state, action) => {
      const newEntry = action.payload;

      state.zakat.push(newEntry);
      state.totalValue += newEntry.value;
    },
    subtractVal: (state, action) => {
      const { id } = action.payload;

      // Find the index of the entry by id
      const index = state.zakat.findIndex(
        (zakatItem) => zakatItem.id === action.payload
      );

      if (index !== -1) {
        const entryToRemove = state.zakat[index];

        if (entryToRemove.value !== undefined) {
          state.totalValue -= entryToRemove.value;

          state.zakat.splice(index, 1);
        }
      } else {
        console.warn(`No entry found with id: ${id}`);
      }
    },
    editZakat: (state, action) => {
      const index = state.zakat.findIndex(
        (zakatItem: any) => zakatItem.id === action.payload.id
      );

      if (index !== -1) {
        const previousValue = state.zakat[index].value;

        if (previousValue !== undefined) {
          state.zakat[index] = { ...state.zakat[index], ...action.payload };

          state.totalValue += action.payload.value - previousValue;
        }
      }
    },
  },
});

export const { zakatCal, subtractVal, editZakat } = zakatSlice.actions;

export default zakatSlice.reducer;
