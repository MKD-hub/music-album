import { createSlice } from "@reduxjs/toolkit";

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

    }
})

export default artistSlice.reducer;