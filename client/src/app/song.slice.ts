import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { ISong } from "../api/song.type";
import { createAsyncActions } from "./utils/createAsyncAction";

const initialState: songState = {
    songs: [],
    status: '',
    error: null
};

interface songState {
    songs: ISong[],
    status: 'pending' | 'success' | 'error' | ''
    error: unknown | null
}


const songSlice = createSlice({
    name: 'song',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getSongs, () => {})

        .addCase(fetchSongsPending, (state) => {
            state.status = 'pending'
        })
        
        .addCase(fetchSongsSuccess, (state, action: PayloadAction<ISong[]>) => {
            state.songs = action.payload;
            state.status = 'success'
        })
        
        .addCase(fetchSongsFailure, (state, action: PayloadAction<unknown>) => {
            state.error = action.payload
            state.status = 'error'
        }) 
    }      
})

export const [getSongs, fetchSongsPending, fetchSongsSuccess, fetchSongsFailure] = createAsyncActions<ISong[]>('songs/fetch');
export const [getSongsByGenre, fetchingGenreSongs, fetchGenreSongSuccess, fetchGenreSongsFailure] = createAsyncActions<ISong[]>('songs/fetch/genre');
export const [getSongsByArtist, fetchingArtistSongs, fetchArtistSongSuccess, fetchArtistSongsFailure] = createAsyncActions<ISong[]>('songs/fetch/artist');


export const selectSongs = (state: { songsReducer: songState }) => state.songsReducer.songs;

export const selectStatus = (state: { songsReducer: songState }) => state.songsReducer.status;

export const selectError = (state: { songsReducer: songState }) => state.songsReducer.error;

export const { reducer: songsReducer } = songSlice;