import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { IUserResponse, IUsersState } from "../../../../../models/users";
import { GetUsers } from "../../../../../services/api";
import { IGeneralState } from "../../../../../models";


const initialReataurantState: IUsersState = {
    data: [],
    status: '',
};


export const increamentUsersAsync = createAsyncThunk(
    "get/restaurants",
    async (_, { fulfillWithValue, rejectWithValue }) => {
        try {
            const response: AxiosResponse<IUserResponse> = await GetUsers();
            console.log(response)
            return fulfillWithValue(response.data);
        } catch (error: any) {
            return rejectWithValue(error.response.data.errors[0].message);
        }
    }
);



export const usersSlice = createSlice({
    name: 'get-restaurant',
    initialState: initialReataurantState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            increamentUsersAsync.pending, (state: IUsersState) => {
                state.status = 'loading';
            }
        )
        builder.addCase(
            increamentUsersAsync.fulfilled,
            (state: IUsersState,action:any) => {
                state.status = "idle";
                state.data=action.payload;
            }
        );
        builder.addCase(
            increamentUsersAsync.rejected, (state: IUsersState) => {
                state.status = 'error';
            }
        )
    }
});

export const usersInformation = (state: IGeneralState) =>state.users.data;

export const usersStatus = (state: IGeneralState) => state.users.status;

export default usersSlice.reducer;