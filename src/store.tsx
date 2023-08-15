import { configureStore } from "@reduxjs/toolkit";
import organizationRegistrationSlice from "./pages/auth/registration/slice/registration";
import organizationLoginSlice from "./pages/auth/login/slice/login";


export const store = configureStore({
    reducer: {
        organizationRegistration: organizationRegistrationSlice,
        organizationLogin: organizationLoginSlice
    }
});