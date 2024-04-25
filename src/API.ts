import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {HistoryRow, NewHistoryRow} from "./NotifyList/Types.ts";
import {configureStore} from "@reduxjs/toolkit";

export const API_URL = "http://127.0.0.1:5000";

export const notifyApi = createApi({
  reducerPath: "notifications",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/`
  }),
  endpoints: (builder) => ({

    /**
     * Get server side notifications history
     */
    serverHistory: builder.query<{ history: HistoryRow[] }, void>({
      query: () => "history",
    }),

    /**
     * Delete item from history
     */
    deleteHistoryItem: builder.mutation<boolean, number>({
      query: (id: number) => ({
        url: `history/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id: number, api): Promise<void> {
        try {
          await api.queryFulfilled;
          api.dispatch(notifyApi.util?.updateQueryData('serverHistory', undefined, (data) => {
            data.history = data.history.filter((row) => row.id != id);
          }))
        } catch(e) {
          console.warn(e);
        }
      }
    }),

    /**
     * Insert new notification
     */
    addNotification: builder.mutation<HistoryRow, NewHistoryRow>({
      query: (row) => ({
        url: "send",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(row),
      }),
      async onQueryStarted(_row, api): Promise<void> {
        try {
          const {data: newRow} = await api.queryFulfilled;
          api.dispatch(notifyApi.util?.updateQueryData('serverHistory', undefined, (data) => {
            data.history = [
              ...data.history,
              newRow,
            ];
          }))
        } catch(e) {
          console.warn(e);
        }
      },
    }),

  }),
})


export const store = configureStore({
  reducer: {
    [notifyApi.reducerPath]: notifyApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(notifyApi.middleware),
})

export const {
  useServerHistoryQuery,
  useDeleteHistoryItemMutation,
  useAddNotificationMutation
} = notifyApi;
