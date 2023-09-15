import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { AxiosResponse } from "axios";
import { IGenreResponse, IGenreState } from "../../../models/genre";
import { GetGenre } from "../../../services/api";
import { IGeneralState } from "../../../models";

const initialGenreState: IGenreState = {
    data: [],
}


export const increamentGenreAsync = createAsyncThunk(
    "get/genre",
    async (_, { fulfillWithValue, rejectWithValue }) => {
        try {
            const response: AxiosResponse<IGenreResponse> = await GetGenre();
            return fulfillWithValue(response.data);
        } catch (error: any) {
            return rejectWithValue(error.response.data.errors[0].message);
        }
    }
);


export const genreSlice = createSlice({
    name: "genre",
    initialState: initialGenreState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            increamentGenreAsync.fulfilled,
            (state: IGenreState, action: any) => {
                state.data = action.payload;
            }
        );
    },
});


export const genreInformationSelector = (state: IGeneralState) => state.genre.data;

export default genreSlice.reducer;
