
import { IZakat } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  zakat: IZakat[];
  totalValue: number; // to keep track of the total zakat amount
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

      // Add new entry to the array
      state.zakat.push(newEntry);

      // Update total value
      state.totalValue += newEntry.value; // Assuming value is a numeric type
    },
    subtractVal: (state, action) => {
      const { id } = action.payload;
     
      // Find the index of the entry by id
      const index = state.zakat.findIndex(zakatItem => zakatItem.id === action.payload);
     
      
      if (index !== -1) {
        const entryToRemove = state.zakat[index];

        if (entryToRemove.value !== undefined) {
          // Update total value
          state.totalValue -= entryToRemove.value; // Subtract the value of the entry being removed

          // Remove the item with the specified id
          state.zakat.splice(index, 1); // Remove the entry from the array
        }
      } else {
        console.warn(`No entry found with id: ${id}`);
      }
    },
    editZakat: (state, action) => {
    
    

      // Find the index of the entry by id
      const index = state.zakat.findIndex((zakatItem : any) => zakatItem.id === action.payload.id);
   
      if (index !== -1) {
      
        const previousValue = state.zakat[index].value;

        // Check if previousValue is defined
        if (previousValue !== undefined) {
          // Update the existing entry with the new values
          state.zakat[index] = { ...state.zakat[index], ...action.payload };

          // Update total value based on the difference
          state.totalValue += action.payload.value - previousValue;
        } 
      } 
    },
  },
});

export const { zakatCal, subtractVal, editZakat } = zakatSlice.actions;

export default zakatSlice.reducer;
