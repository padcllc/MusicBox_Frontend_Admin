import { createSlice } from "@reduxjs/toolkit";
import { ISongPlayerState } from "../../../models/songs";
import { IGeneralState } from "../../../models";

const initialSongPlayerState: ISongPlayerState = {
    songItem: {},
    status: {},
    selector:'',
}


export const playerSongsSlice = createSlice({
    name: "player-song",
    initialState: initialSongPlayerState,
    reducers: {
        sendSongItemData: (state: ISongPlayerState, action: any) => {
            console.log(action,'action')
            state.songItem = action.payload;
        },
        updateStatus: (state: ISongPlayerState, action: any) => {
            state.status = action.payload;
        },
        updateSelector: (state: ISongPlayerState, action: any) => {
            state.selector = action.payload;
        }
    },

});


export const { sendSongItemData,updateStatus,updateSelector } = playerSongsSlice.actions;

export const playerSongItemInformationSelector = (state: IGeneralState) => state.playerSongs.songItem;
export const playSongItemStatusInformationSelector = (state: IGeneralState) => state.playerSongs.status;
export const playSongItemSelectorInformationSelector = (state: IGeneralState) => state.playerSongs.selector;

export default playerSongsSlice.reducer;