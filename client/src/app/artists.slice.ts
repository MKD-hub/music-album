import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IArtist } from "../api/song.type";
interface artistState {
    artists: string[]
}

const initialState: artistState = {
    artists: []
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
    }
})

export default artistSlice.reducer;