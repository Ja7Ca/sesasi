import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/authSlice";
import { noteSlice } from "./features/note/noteSlice";
import { userSlice } from "./features/user/userSlice";

const reducer = combineReducers({
    [authSlice.reducerPath]: authSlice.reducer,
    [noteSlice.reducerPath]: noteSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
});

const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            [authSlice.middleware],
            [noteSlice.middleware],
            [userSlice.middleware]
        ),
});

export default store;
