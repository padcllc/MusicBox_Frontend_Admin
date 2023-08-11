import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { 
    IGeneralState, 
    IUserRegistrationData, 
    IUserRegistrationResponse, 
    IUserRegistrationState, 
    IUserRegistrationctionFulfilled,
} 
    from "../../../../models";

import { UserRegistration } from '../../../../services/api';
import { AxiosResponse } from "axios";

const initialUserRegistrationState: IUserRegistrationState = {
    status: '',
    error: null,
    accessToken: '',
    refreshToken: '',
};

export const increamentUserRegistration = createAsyncThunk(
    'user/registration',
    async (userData: IUserRegistrationData, { fulfillWithValue, rejectWithValue }) => {
        try {
            const response: AxiosResponse<IUserRegistrationResponse> = await UserRegistration(userData);
            return fulfillWithValue(response.data.data)
        }
        catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);


export const userRegistrationSlice = createSlice({
    name: 'user-registration',
    initialState: initialUserRegistrationState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            increamentUserRegistration.pending, (state: IUserRegistrationState) => {
                state.status = 'loading';
            }
        );
        builder.addCase(
            increamentUserRegistration.fulfilled, (state: IUserRegistrationState, action: IUserRegistrationctionFulfilled) => {
                state.status = 'idle';
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                localStorage.setItem("refreshToken", action.payload.refreshToken);
                localStorage.setItem("accessToken", action.payload.accessToken);
            }

        );
        builder.addCase(
            increamentUserRegistration.rejected, (state: IUserRegistrationState,action:any) => {
                state.status = 'error';
                state.error = action.payload;
            }
        )
    }

});

export const userRegistrationStatusSelector = (state: IGeneralState) => state.userRegistration.status;
export const userRegistrationErrorSelector = (state: IGeneralState) => state.userRegistration.error;


export default userRegistrationSlice.reducer;

