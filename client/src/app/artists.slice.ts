import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IArtist } from "../api/song.type";
import { createAsyncActions } from "./utils/createAsyncAction";
interface artistState {
    artists: IArtist[],
    status: 'pending' | 'success' | 'error' | '',
    error: unknown | null
}

const initialState: artistState = {
    artists: [],
    status: '',
    error: null
}

const artistSlice = createSlice({
    name: 'artists',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(getArtists, (state) => {
            state.status = 'pending'
        })

        .addCase(fetchArtistSuccess, (state, action: PayloadAction<IArtist[]>) => {
            state.artists = action.payload
            state.status = 'success'
        })

        .addCase(fetchArtistsFailure, (state, action: PayloadAction<unknown>) => {
            state.status = 'error'
            state.error = action.payload
        })
    }
})

export const [getArtists, fetchArtistSuccess, fetchArtistsFailure] = createAsyncActions<IArtist[]>('artist/fetch')

export const selectArtists = (state: { artistReducer: artistState }) => state.artistReducer.artists;

export const { reducer: artistReducer } = artistSlice;