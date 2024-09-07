import { createSlice } from "@reduxjs/toolkit";
import { ISong } from "../api/song.type";
import { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncActions } from "./utils/createAsyncAction";

interface updateSongState {
    song: ISong,
    status: 'pending' | 'success' | 'error' | '',
    error: unknown | null
}

const initialState: updateSongState = {
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

const updateSongSlice = createSlice({
    name: 'update',
    initialState,
    reducers: {},
    extraReducers: bulider => {
        bulider
        .addCase(updateSong, (state, _: PayloadAction<Partial<ISong>>) => {
            state.status = 'pending'
        })

        .addCase(updateSongSuccess, (state, action: PayloadAction<ISong>) => {
            state.status = 'success'
            state.song = action.payload
        })

        .addCase(updateSongFailure, (state, action: PayloadAction<unknown>) => {
            state.status = 'error'
            state.error = action.payload
        })
    }
})

export const [updateSong, updateSongSuccess, updateSongFailure] = createAsyncActions<ISong>('update/song')

export const selectSong = (state: { updateReducer: updateSongState }) => state.updateReducer.song
export const selectStatus = (state: { updateReducer: updateSongState }) => state.updateReducer.status
export const selectError = (state: { updateReducer: updateSongState }) => state.updateReducer.error

export const { reducer: updateReducer } = updateSongSlice;