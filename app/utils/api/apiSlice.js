import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE || 'https://stock-mg-api.onrender.com/api' }),
  // baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000/api' }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: ({ endpoint }) => ({
        url: endpoint,
        method: 'GET',
      }),
    }),
    postData: builder.mutation({
      query: ({ endpoint, body }) => ({
        url: endpoint,
        method: 'POST',
        body,
      }),
    }),
    putData: builder.mutation({
      query: ({ endpoint, body }) => ({
        url: endpoint,
        method: 'PUT',
        body,
      }),
    }),
    deleteData: builder.mutation({
      query: ({ endpoint }) => ({
        url: endpoint,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetDataQuery,
  useLazyGetDataQuery,
  usePostDataMutation,
  usePutDataMutation,
  useDeleteDataMutation,
} = apiSlice;
