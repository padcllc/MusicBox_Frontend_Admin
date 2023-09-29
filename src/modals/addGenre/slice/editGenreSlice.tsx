import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { IGeneralState } from "../../../models";
import { IEditGenreResponse, IEditGenreState, IGenreData } from "../../../models/genre";
import { EditGenre } from "../../../services/api";



const initialeditGenretate: IEditGenreState = {
    status: '',
    error: null,

};


export const increamentEditGenreAsync = createAsyncThunk(
    "edit/genre",
    async (genreData: IGenreData, { fulfillWithValue, rejectWithValue }) => {
        try {
            const id: number = genreData.id;
            const name: string = genreData.name;
            const response: AxiosResponse<IEditGenreResponse> = await EditGenre(id, { name });
            return fulfillWithValue(response.data);
        } catch (error: any) {
            return rejectWithValue(error.response.data.errors[0].message);
        }
    }
);

export const editGenreSlice = createSlice({
    name: 'edit-genre',
    initialState: initialeditGenretate,
    reducers: {
        updateEditStatus(state, action) {
            state.status = action.payload;
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            increamentEditGenreAsync.pending, (state: IEditGenreState) => {
                state.status = 'loading';
            }
        )
        builder.addCase(
            increamentEditGenreAsync.fulfilled,
            (state: IEditGenreState, action: any) => {
                state.status = "idle";
            }
        );
        builder.addCase(
            increamentEditGenreAsync.rejected, (state: IEditGenreState, action: any) => {
                state.status = 'error';
                state.error = action.payload;
            }
        )
    }
});

export const { updateEditStatus } = editGenreSlice.actions;

export const editGenretatusSelector = (state: IGeneralState) => state.editGenre.status;
export const editGenreErrorSelector = (state: IGeneralState) => state.editGenre.error;


export default editGenreSlice.reducer;