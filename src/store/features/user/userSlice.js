import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Auth from "../../../utils/Auth";
import CONST from "../../../utils/constants";
import { useNavigate } from "react-router-dom";

export const userSlice = createApi({
    reducerPath: "userSlice",
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
    tagTypes: ["User"],
    endpoints: (builder) => ({
        getAllUser: builder.query({
            query: () => ({
                url: "users",
                method: "GET",
            }),
            transformErrorResponse(error) {
                return error;
            },
            transformResponse(response) {
                return response;
            },
            providesTags: ["User"],
        }),
        putUser: builder.mutation({
            query: ({ id, name, user, pass }) => ({
                url: `users/${id}`,
                method: "PUT",
                body: { name, user, pass },
            }),
            transformErrorResponse(error) {
                return error;
            },
            transformResponse(response) {
                return response;
            },
            providesTags: ["User"],
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `users/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse(error) {
                return error;
            },
            transformResponse(response) {
                Auth.signOut(useNavigate);
                return response;
            },
            providesTags: ["User"],
        }),
    }),
});

export const { useGetAllUserQuery, usePutUserMutation, useDeleteUserMutation } =
    userSlice;
