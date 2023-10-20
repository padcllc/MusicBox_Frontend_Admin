import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IOrganizationLoginData, IOrganizationLoginResponse, IOrganizationLoginState } from "../../../../models/login";
import { AxiosResponse } from "axios";
import { OrganizatiolLogin } from "../../../../services/api";
import { IGeneralState } from "../../../../models";

const initialOrganizationLoginState: IOrganizationLoginState = {
    accessToken:localStorage.getItem("accessToken"),
    refreshToken:localStorage.getItem("refreshToken"),
    status: '',
    error: null,
   
};


export const increamentOrganizationLoginAsync = createAsyncThunk(
    "organization/login",
    async (organizationData: IOrganizationLoginData, {fulfillWithValue,rejectWithValue}) => {
      try {
        const response:AxiosResponse<IOrganizationLoginResponse> = await OrganizatiolLogin(organizationData);
        return fulfillWithValue(response.data);
      } catch (error: any) {
        return rejectWithValue(error.response.data.errors[0].message);
      }
    }
  );



export const organizationLoginSlice = createSlice({
    name: 'organization-login',
    initialState: initialOrganizationLoginState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            increamentOrganizationLoginAsync.pending, (state: IOrganizationLoginState) => {
                state.status = 'loading';
            }
        )
        builder.addCase(
            increamentOrganizationLoginAsync.fulfilled,
            (state: IOrganizationLoginState, action:any) => {
              state.status = "idle";
              state.accessToken = action.payload.accessToken;
              state.refreshToken = action.payload.refreshToken;
              localStorage.setItem("refreshToken", action.payload.refreshToken);
              localStorage.setItem("accessToken", action.payload.accessToken);
            }
          );
        builder.addCase(
            increamentOrganizationLoginAsync.rejected, (state: IOrganizationLoginState, action: any) => {
                state.status = 'error';
                state.error = action.payload;
            }
        )
    }
});

export const accessTokenSelector = (state: IGeneralState) => state.organizationLogin.accessToken;
export const refreshToken = (state: IGeneralState) => state.organizationLogin.refreshToken;
export const organizationLoginStatusSelector = (state: IGeneralState) => state.organizationLogin.status;
export const organizationLoginErrorSelector = (state: IGeneralState) => state.organizationLogin.error;

export default organizationLoginSlice.reducer;