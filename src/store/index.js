import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
})