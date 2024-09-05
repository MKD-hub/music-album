import { createSlice } from "@reduxjs/toolkit";
import { ISong } from "../api/song.type";
import { createAsyncActions } from "./utils/createAsyncAction";
import { PayloadAction } from "@reduxjs/toolkit";

interface createSongState {
    song: ISong,
    status: 'pending' | 'success' | 'error' | '',
    error: unknown | null
}

const initialState: createSongState = {
    song: {
        _id: '',
        title: '',
        artist: '',
        album: '',
        genre: ''
    },
    status: '',
    error: null
}

const createSongSlice = createSlice({
    name: 'createSong',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createSong, (state, _: PayloadAction<ISong | unknown>) => {
            state.status = 'pending'
        })

        .addCase(createSongSuccess, (state, action: PayloadAction<ISong>) => {
            state.song = action.payload
            state.status = 'success'
        })

        .addCase(createSongFailure, (state, action: PayloadAction<unknown>) => {
            state.error = action.payload
            state.status = 'error'
        })
    }
})

export const [createSong, createSongSuccess, createSongFailure] = createAsyncActions<ISong>('songs/post');

export const selectStatus = (state: { createSongReducer: createSongState }) => state.createSongReducer.status;

export const selectError = (state:{ createSongReducer: createSongState }) => state.createSongReducer.error;

export const { reducer: createSongReducer } = createSongSlice;