import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
});

// Custom baseQuery function to choose the correct baseQuery
const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  return baseQuery(args, api, extraOptions);
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  tagTypes: ['Events', 'TodayEvents'],
  endpoints: () => ({}),
});
