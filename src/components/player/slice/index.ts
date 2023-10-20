import { createSlice } from "@reduxjs/toolkit";
import { ISongPlayerState } from "../../../models/songs";
import { IGeneralState } from "../../../models";

const initialSongPlayerState: ISongPlayerState = {
    songItem: {},
    status: {},
    selectedSongIndex: 0,
    videoIsPlaying: false,
}


export const playerSongsSlice = createSlice({
    name: "player-song",
    initialState: initialSongPlayerState,
    reducers: {
        sendSongItemData: (state: ISongPlayerState, action) => {
            state.songItem = action.payload;
        },
        updateStatus: (state: ISongPlayerState, action) => {
            state.status = action.payload;
        },
        updateSelectedSongIndex: (state: ISongPlayerState, action) => {
            state.selectedSongIndex = action.payload;
        },
        updatevideoIsPlaying: (state: ISongPlayerState, action) => {
            state.videoIsPlaying = action.payload;
        }
    },

});


export const { sendSongItemData, updateStatus, updateSelectedSongIndex, updatevideoIsPlaying } = playerSongsSlice.actions;

export const playerSongItemInformationSelector = (state: IGeneralState) => state.playerSongs.songItem;
export const playSongItemStatusInformationSelector = (state: IGeneralState) => state.playerSongs.status;
export const selectedSongIndexInformationSelector = (state: IGeneralState) => state.playerSongs.selectedSongIndex;
export const videoIsPlayingInformationSelector = (state: IGeneralState) => state.playerSongs.videoIsPlaying;

export default playerSongsSlice.reducer;