import { configureStore } from "@reduxjs/toolkit";
import  userRegistrationSlice from "./pages/auth/registration/slice/registration";

export const store = configureStore({
    reducer: {
        userRegistration:userRegistrationSlice
    }
});