import { ISetup } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit';
import DateObject from 'react-date-object';
import hijri from 'react-date-object/calendars/arabic';

const locales = {
  lunar: {
    months: [
      ['Muharram'],
      ['Safar'],
      ["Rabi' al-Awwal"],
      ["Rabi' al-Thani"],
      ['Jumada al-Awwal'],
      ['Jumada al-Thani'],
      ['Rajab'],
      ["Sha'ban"],
      ['Ramadan'],
      ['Shawwal'],
      ["Dhul-Qi'dah"],
      ['Dhul-Hijjah'],
    ],
  },
};

interface IInitialState {
  setup: ISetup;
}

const initialState: IInitialState = {
  setup: {
    startDate: '',
    generic: '', // Ensure generic is initialized
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
        state.setup.startDate = data.startDate; // Keep startDate as is
        state.setup.year = data.year;
        state.setup.religion = data.religion;

        // Convert lunar date to solar date if necessary
        if (data.year === 'lunar') {
        
          
          if(data.startDate !== null){
            const parts = data.startDate.split(' ');
            const day = parseInt(parts[0], 10);
            const yearHijri = parseInt(parts[parts?.length - 1], 10); // Always take the last part as year
  
            // Join the month parts in case they are multiple words
            const monthStr = parts.slice(1, parts?.length - 1).join(' ').trim(); // Combine middle parts for the month
  
            const monthIndex = locales.lunar.months.findIndex((month: any) => month[0] === monthStr);
  
            if (monthIndex !== -1) {
             
              // Create a DateObject with the lunar date
              const lunarDate = new DateObject({
                day,
                month: monthIndex + 1, // months are 1-indexed in DateObject
                year: yearHijri,
                calendar: hijri,
              });
  
              // Convert to Gregorian date
              const solarDate = lunarDate.toDate();
              const formattedDate = `${solarDate.getDate()} ${solarDate.toLocaleString('default', { month: 'long' })} ${solarDate.getFullYear()}`;
  
              // Store converted date in generic
              state.setup.generic = formattedDate; // Only update generic with the converted date
            
            } else {
              console.error(`Month "${monthStr}" not found in lunar months.`);
            }
          } else {
            state.setup.generic = data.startDate
          }
          }
        
      }
    },
  },
});

export const { profileData } = setupSlice.actions;

export default setupSlice.reducer;
