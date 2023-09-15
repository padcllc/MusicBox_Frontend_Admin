import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { IAddSongData, IAddSongResponse, IAddSongsState } from "../../../models/songs";
import { AddSong } from "../../../services/api";
import { IGeneralState } from "../../../models";

const initialAddSongState: IAddSongsState = {
    status: '',
    error: null,

};


export const increamentAddSongAsync = createAsyncThunk(
    "add/song",
    async (songData: IAddSongData, { fulfillWithValue, rejectWithValue }) => {
        try {
            const response: AxiosResponse<IAddSongResponse> = await AddSong(songData);
            return fulfillWithValue(response.data);
        } catch (error: any) {
            console.log(error)
            return rejectWithValue(error.response.data.errors[0].message);
        }
    }
);



export const addSongSlice = createSlice({
    name: 'add-song',
    initialState: initialAddSongState,
    reducers: {
        updateStatus(state, action) {
            state.status = action.payload;
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            increamentAddSongAsync.pending, (state: IAddSongsState) => {
                state.status = 'loading';
            }
        )
        builder.addCase(
            increamentAddSongAsync.fulfilled,
            (state: IAddSongsState, action: any) => {
                state.status = "idle";
            }
        );
        builder.addCase(
            increamentAddSongAsync.rejected, (state: IAddSongsState, action: any) => {
                state.status = 'error';
                state.error = action.payload;
            }
        )
    }
});

export const { updateStatus } = addSongSlice.actions;

export const addSongStatusSelector = (state: IGeneralState) => state.addSongs.status;
export const addSongErrorSelector = (state: IGeneralState) => state.addSongs.error;


export default addSongSlice.reducer;