import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Auth from "../../../utils/Auth";
import CONST from "../../../utils/constants";
import { useNavigate } from "react-router-dom";

export const noteSlice = createApi({
    reducerPath: "noteSlice",
    baseQuery: fetchBaseQuery({
        mode: "cors",
        baseUrl: CONST.BASE_URL,
        credentials: "omit",
        prepareHeaders: (headers) => {
            const token = Auth.getAccessToken();

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            headers.set("Access-Control-Allow-Origin", "*");
            headers.set(
                "Access-Control-Allow-Methods",
                "GET, POST, PUT, DELETE, OPTIONS"
            );
            headers.set("Access-Control-Allow-Credentials", "true");

            return headers;
        },
    }),
    tagTypes: ["Note"],
    endpoints: (builder) => ({
        getAllNote: builder.query({
            query: () => ({
                url: "notes",
                method: "GET",
            }),
            transformErrorResponse(error) {
                return error;
            },
            transformResponse(response) {
                return response;
            },
            providesTags: ["Note"],
        }),
        postNote: builder.mutation({
            query: ({ title, note }) => ({
                url: "notes",
                method: "POST",
                body: { title, note },
            }),
            transformErrorResponse(error) {
                return error;
            },
            transformResponse(response) {
                return response;
            },
            providesTags: ["Note"],
        }),
        putNote: builder.mutation({
            query: ({ id, title, note }) => ({
                url: `notes/${id}`,
                method: "PUT",
                body: { title, note },
            }),
            transformErrorResponse(error) {
                return error;
            },
            transformResponse(response) {
                return response;
            },
            providesTags: ["Note"],
        }),
        deleteNote: builder.mutation({
            query: ({ id }) => ({
                url: `notes/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse(error) {
                return error;
            },
            transformResponse(response) {
                Auth.signOut(useNavigate);
                return response;
            },
            providesTags: ["Note"],
        }),
    }),
});

export const {
    useGetAllNoteQuery,
    usePostNoteMutation,
    usePutNoteMutation,
    useDeleteNoteMutation,
} = noteSlice;
