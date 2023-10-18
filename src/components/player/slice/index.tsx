import { createSlice } from "@reduxjs/toolkit";
import { ISongPlayerState } from "../../../models/songs";
import { IGeneralState } from "../../../models";

const initialSongPlayerState: ISongPlayerState = {
    songItem: {},
    status: {},
    selectedSongIndex: 0
}


export const playerSongsSlice = createSlice({
    name: "player-song",
    initialState: initialSongPlayerState,
    reducers: {
        sendSongItemData: (state: ISongPlayerState, action: any) => {
            state.songItem = action.payload;
        },
        updateStatus: (state: ISongPlayerState, action: any) => {
            state.status = action.payload;
        },
        updateSelectedSongIndex: (state: ISongPlayerState, action: any) => {
            state.selectedSongIndex = action.payload;
        }
    },

});


export const { sendSongItemData, updateStatus, updateSelectedSongIndex } = playerSongsSlice.actions;

export const playerSongItemInformationSelector = (state: IGeneralState) => state.playerSongs.songItem;
export const playSongItemStatusInformationSelector = (state: IGeneralState) => state.playerSongs.status;
export const selectedSongIndexInformationSelector = (state: IGeneralState) => state.playerSongs.selectedSongIndex;

export default playerSongsSlice.reducer;