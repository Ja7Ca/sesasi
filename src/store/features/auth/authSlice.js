import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Auth from "../../../utils/Auth";
import CONST from "../../../utils/constants";

export const authSlice = createApi({
    reducerPath: "authSlice",
    baseQuery: fetchBaseQuery({
        mode: "cors",
        baseUrl: CONST.BASE_URL,
        credentials: "omit",
        prepareHeaders: (headers) => {
            const token = Auth.getAccessToken();

            //     if (token) {
            headers.set("Authorization", `Bearer ${token ? token : ""}`);
            //     }

            //     headers.set("Access-Control-Allow-Origin", "*");
            //     headers.set(
            //         "Access-Control-Allow-Methods",
            //         "GET, POST, PUT, DELETE, OPTIONS"
            //     );
            //     headers.set("Access-Control-Allow-Credentials", "true");

            return headers;
        },
    }),
    tagTypes: ["Auth"],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ username, password }) => ({
                url: "login",
                method: "POST",
                body: { user: username, pass: password },
            }),
            transformErrorResponse(error) {
                return error;
            },
            transformResponse(response) {
                Auth.storeUserInfoToCookie(response.access_token);
                return response;
            },
            providesTags: ["Auth"],
        }),
        register: builder.mutation({
            query: ({ name, username, password }) => ({
                url: "register",
                method: "POST",
                body: { name, user: username, pass: password },
            }),
            transformErrorResponse(error) {
                return error;
            },
            transformResponse(response) {
                return response;
            },
            providesTags: ["Auth"],
        }),
        logout: builder.mutation({
            query: () => ({
                url: "logout",
                method: "POST",
            }),
            transformErrorResponse(error) {
                return error;
            },
            transformResponse(response) {
                Auth.signOut();
                return response;
            },
            providesTags: ["Auth"],
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
    authSlice;
