import { IUser } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  user: IUser | null | undefined;
}

const initialState: IInitialState = {
  user: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const { userLoggedIn } = authSlice.actions;

export default authSlice.reducer;
