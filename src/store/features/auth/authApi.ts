import { apiSlice } from '../api/apiSlice';
import { userLoggedIn } from './authSlice';
import { LOGIN_ENDPOINT } from '../api/endpoints';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // login endpoint here
    login: builder.mutation({
      query: (data) => ({
        url: LOGIN_ENDPOINT,
        method: 'POST',
        body: JSON.stringify(data),
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // setting logged data to redux state
          dispatch(
            userLoggedIn({
              user: result.data.data.user,
            })
          );
        } catch (error: any) {}
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
