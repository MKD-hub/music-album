import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGenre } from "../api/song.type";
import { createAsyncActions } from "./utils/createAsyncAction";

interface genreState {
    genres: IGenre[]
    status: 'pending' | 'success' | 'error' | ''
    error: unknown
}

const initialState: genreState = {
    genres: [],
    status: '',
    error: null
}

const genreSlice = createSlice({
    name: 'genre',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getGenres, (state) => {
            state.status = 'pending'
        })

        .addCase(fetchGenreSuccess, (state, action: PayloadAction<IGenre[]>) => {
            state.genres = action.payload;
            state.status = 'success'
        })

        .addCase(fetchGenresFailure, (state, action: PayloadAction<unknown>) => {
            state.error = action.payload
            state.status = 'error'
        })
    }

})

export const [getGenres, fetchGenreSuccess, fetchGenresFailure] = createAsyncActions<IGenre[]>('genres/fetch');

export const selectGenres = (state: { genreReducer: genreState }) => state.genreReducer.genres;
export const selectStatus = (state: { genreReducer: genreState }) => state.genreReducer.status;
export const selectError = (state: { genreReducer: genreState }) => state.genreReducer.error

export const { reducer: genreReducer } = genreSlice;