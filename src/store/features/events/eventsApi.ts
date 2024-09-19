// import toast from 'react-hot-toast';

import { apiSlice } from '../api/apiSlice';
import { EVENTS, TODAY_EVENTS } from '../api/endpoints';

export const eventApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createEvent: builder.mutation({
      query: (data) => ({
        url: EVENTS,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error: any) {}
      },
    }),

    getTodayEvents: builder.query({
      query: () => TODAY_EVENTS,
      providesTags: ['TodayEvents'],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error: any) {}
      },
    }),
  }),
});

export const {
  useCreateEventMutation,
  useGetTodayEventsQuery,
  useLazyGetTodayEventsQuery,
} = eventApi;
