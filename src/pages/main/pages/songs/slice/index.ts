import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IGeneralState } from "../../../../../models";
import { ISongsResponse, ISongsState } from "../../../../../models/songs";
import { GetSongs } from "../../../../../services/api";
import { AxiosResponse } from "axios";

const initialSongsState: ISongsState = {
    data: [],
    status: '',
}


export const increamentSongsAsync = createAsyncThunk(
    "get/songs",
    async (search:string, { fulfillWithValue, rejectWithValue }) => {
        try {
            const response: AxiosResponse<ISongsResponse> = await GetSongs(search);
            return fulfillWithValue(response.data);
        } catch (error: any) {
            return rejectWithValue(error.response.data.errors[0].message);
        }
    }
);


export const songsSlice = createSlice({
    name: "songs",
    initialState: initialSongsState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(increamentSongsAsync.pending, (state: ISongsState) => {
        state.status = "loading";
      });
      builder.addCase(
        increamentSongsAsync.fulfilled,
        (state: ISongsState, action: any) => {
          state.data = action.payload;
          state.status = "idle";
        }
      );
    },
  });
  
  
export const songsInformationSelector = (state: IGeneralState) =>state.songs.data;

export const songsStatusSelector = (state: IGeneralState) => state.songs.status;

export default songsSlice.reducer;
