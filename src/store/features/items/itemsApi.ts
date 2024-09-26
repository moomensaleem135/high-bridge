// import toast from 'react-hot-toast';

import { apiSlice } from '../api/apiSlice';
import { ITEMS, ZAKAT_ITEMS } from '../api/endpoints';

export const itemsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createItem: builder.mutation({
      query: (data) => ({
        url: ITEMS,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error: any) {}
      },
    }),

    getZakatItems: builder.query({
      query: () => ZAKAT_ITEMS,
      providesTags: ['ZakatItems'],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error: any) {}
      },
    }),
  }),
});

export const {
  useCreateItemMutation,
  useGetZakatItemsQuery,
  useLazyGetZakatItemsQuery,
} = itemsApi;
