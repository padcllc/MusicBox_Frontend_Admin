import { configureStore } from "@reduxjs/toolkit";
import organizationRegistrationSlice from "./pages/auth/registration/slice/registration";
import organizationLoginSlice from "./pages/auth/login/slice/login";
import restaurantsSlice from "./pages/main/pages/restaurants/slice";
import usersSlice from "./pages/main/pages/users/slice";
import songsSlice from "./pages/main/pages/songs/slice";
import genreSlice from "./components/genre/slice";
import addSongSlice from "./modals/addSong/slice";
import addGenreSlice from "./modals/addGenre/slice";
import editGenreSlice from "./modals/addGenre/slice/editGenreSlice";
import mainSongsSlice from "./pages/main/slice";
import playerSongsSlice from "./components/player/slice";
import youtubeSongsSlice from "./components/player/slice/getYoutubeVideo";


export const store = configureStore({
    reducer: {
        organizationRegistration: organizationRegistrationSlice,
        organizationLogin: organizationLoginSlice,
        restaurants: restaurantsSlice,
        users: usersSlice,
        songs: songsSlice,
        genre: genreSlice,
        addSongs: addSongSlice,
        addGenre: addGenreSlice,
        editGenre: editGenreSlice,
        mainSongs: mainSongsSlice,
        playerSongs: playerSongsSlice,
        youtubeSong: youtubeSongsSlice
    }
});