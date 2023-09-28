import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { IGeneralState } from "../../../models";
import { IAddGenreData, IAddGenreResponse, IAddGenreState } from "../../../models/genre";
import { AddGenre } from "../../../services/api";



const initialAddGenretate: IAddGenreState = {
    status: '',
    error: null,

};


export const increamentAddGenreAsync = createAsyncThunk(
    "add/genre",
    async (genreData: IAddGenreData, { fulfillWithValue, rejectWithValue }) => {
        try {
            const response: AxiosResponse<IAddGenreResponse> = await AddGenre(genreData);
            return fulfillWithValue(response.data);
        } catch (error: any) {
            console.log(error)
            return rejectWithValue(error.response.data.errors[0].message);
        }
    }
);

export const addGenreSlice = createSlice({
    name: 'add-genre',
    initialState: initialAddGenretate,
    reducers: {
        updateStatus(state, action) {
            state.status = action.payload;
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            increamentAddGenreAsync.pending, (state: IAddGenreState) => {
                state.status = 'loading';
            }
        )
        builder.addCase(
            increamentAddGenreAsync.fulfilled,
            (state: IAddGenreState, action: any) => {
                state.status = "idle";
            }
        );
        builder.addCase(
            increamentAddGenreAsync.rejected, (state: IAddGenreState, action: any) => {
                state.status = 'error';
                state.error = action.payload;
            }
        )
    }
});

export const { updateStatus } = addGenreSlice.actions;

export const addGenretatusSelector = (state: IGeneralState) => state.addGenre.status;
export const addGenreErrorSelector = (state: IGeneralState) => state.addGenre.error;


export default addGenreSlice.reducer;