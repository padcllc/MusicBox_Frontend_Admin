import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { 
    IGeneralState, 
    IOrganizationRegistrationData, 
    IOrganizationRegistrationResponse, 
    IOrganizationRegistrationState, 
} 
    from "../../../../models";

import { OrganizationRegistration } from '../../../../services/api';
import { AxiosResponse } from "axios";

const initialOrganizationRegistrationState: IOrganizationRegistrationState = {
    status: '',
    error: null,
};



export const increamentOrganizationRegistration = createAsyncThunk(
    'organization/registration',
    async (organizationData: IOrganizationRegistrationData, { fulfillWithValue, rejectWithValue }) => {
        try {
            const response: AxiosResponse<IOrganizationRegistrationResponse> = await OrganizationRegistration(organizationData);
            return fulfillWithValue(response.data);
        }
        catch (error: any) {
            return rejectWithValue(error.response.data.errors[0].message);
        }
    }
);



export const organizationRegistrationSlice = createSlice({
    name: 'organization-registration',
    initialState: initialOrganizationRegistrationState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            increamentOrganizationRegistration.pending, (state: IOrganizationRegistrationState) => {
                state.status = 'loading';
            }
        );
        builder.addCase(
            increamentOrganizationRegistration.fulfilled,
            (state: IOrganizationRegistrationState) => {
              state.status = "idle";
            }
          );

        builder.addCase(
            increamentOrganizationRegistration.rejected, (state: IOrganizationRegistrationState,action:any) => {
                state.status = 'error';
                state.error = action.payload;
            }
        )
    }

});


export const organizationRegistrationStatusSelector = (state: IGeneralState) => state.organizationRegistration.status;
export const organizationRegistrationErrorSelector = (state: IGeneralState) => state.organizationRegistration.error;


export default organizationRegistrationSlice.reducer;

