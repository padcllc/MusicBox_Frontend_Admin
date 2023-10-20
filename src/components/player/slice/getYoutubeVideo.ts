import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { GetYoutubeVideo } from "../../../services/api";
import { IYoutubeSongDataResponse, IYoutubeSongState } from "../../../models/youtube";
import { IGeneralState } from "../../../models";



const initialYoutubeSongState:IYoutubeSongState= {
    youtubeSongData:null,
}


export const increamentYoutubeAsync = createAsyncThunk(
    "get/youtube/songs",
    async (data:IYoutubeSongDataResponse, { fulfillWithValue, rejectWithValue }) => {
     const apiKey = data.apiKey;
     const videoId = data.videoId;
        try {
            const response:AxiosResponse = await GetYoutubeVideo(apiKey,videoId);
            return fulfillWithValue(response);
        } catch (error) {
            return rejectWithValue('Error fetching video information');
        }
    }
);


export const youtubeSongsSlice = createSlice({
    name: "youtube-songs",
    initialState: initialYoutubeSongState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(
        increamentYoutubeAsync.fulfilled,
        (state, action:any) => {
        state.youtubeSongData = action.payload.items[0];
        }
      );
    },
  });

  export const youtubSongsDataSelector = (state:IGeneralState) => state.youtubeSong.youtubeSongData;


export default youtubeSongsSlice.reducer;


