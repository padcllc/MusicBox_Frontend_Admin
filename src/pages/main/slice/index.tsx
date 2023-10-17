import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { IMainSongsState } from "../../../models/main";
import { GetSongs } from "../../../services/api";
import { ISongsResponse } from "../../../models/songs";
import { IGeneralState } from "../../../models";

const initialMainSongsState: IMainSongsState = {
    data: [],
}


export const increamentMainSongsAsync = createAsyncThunk(
    "get/main/songs",
    async (search:string, { fulfillWithValue, rejectWithValue }) => {
        try {
            const response: AxiosResponse<ISongsResponse> = await GetSongs(search);
            return fulfillWithValue(response.data);
        } catch (error: any) {
            return rejectWithValue(error.response.data.errors[0].message);
        }
    }
);


export const mainSongsSlice = createSlice({
    name: "main-songs",
    initialState: initialMainSongsState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(
        increamentMainSongsAsync.fulfilled,
        (state: IMainSongsState, action: any) => {
          state.data = action.payload;
        }
      );
    },
  });
  
export const mainSongsInformationSelector = (state: IGeneralState) =>state.mainSongs.data;


export default mainSongsSlice.reducer;
