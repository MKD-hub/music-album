import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { ISong, type Response } from "../api/song.type";
import { createAsyncActions } from "./utils/createAsyncAction";
interface songState {
    songs: ISong[],
    status: 'pending' | 'success' | 'error' | ''
    error: unknown | null,
    pageNumber: number,
    totalPages: number
}

const initialState: songState = {
    songs: [],
    status: '',
    error: null,
    pageNumber: 1,
    totalPages: 0
};



const songSlice = createSlice({
    name: 'song',
    initialState,
    reducers: {
        incrementPage: (state: songState) => {
            state.pageNumber += 1;
        },
        decrementPage: (state: songState) => {
            state.pageNumber -= 1;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getSongs, (state, action: PayloadAction<number | undefined>) => {
            state.pageNumber = action.payload ?? 1;
            state.status = 'pending'
        })
        
        .addCase(fetchSongsSuccess, (state, action: PayloadAction<Response>) => {
            state.songs = action.payload.songs;
            state.totalPages = action.payload.meta.totalPages;
            state.status = 'success'
        })
        
        .addCase(fetchSongsFailure, (state, action: PayloadAction<unknown>) => {
            state.error = action.payload
            state.status = 'error'
        }) 
    }      
})

export const [getSongs, fetchSongsSuccess, fetchSongsFailure] = createAsyncActions<Response>('songs/fetch');
export const [getSongsByGenre, fetchGenreSongSuccess, fetchGenreSongsFailure] = createAsyncActions<ISong[]>('songs/fetch/genre');
export const [getSongsByArtist, fetchArtistSongSuccess, fetchArtistSongsFailure] = createAsyncActions<ISong[]>('songs/fetch/artist');

export const { incrementPage, decrementPage } = songSlice.actions;

export const selectSongs = (state: { songsReducer: songState }) => state.songsReducer.songs;

export const selectStatus = (state: { songsReducer: songState }) => state.songsReducer.status;

export const selectError = (state: { songsReducer: songState }) => state.songsReducer.error;

export const selectPageNumber = (state: { songsReducer: songState }) => state.songsReducer.pageNumber;

export const selectTotalPages = (state: { songsReducer: songState }) => state.songsReducer.totalPages;


export const { reducer: songsReducer } = songSlice;