import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncActions } from "./utils/createAsyncAction";

interface delteSongState {
    deleteMessage: string,
    status: 'pending' | 'success' | 'error' | '',
    error: unknown | null
}


const initialState: delteSongState = {
    deleteMessage: '',
    status: '',
    error: null
}


const deleteSongSlice = createSlice({
    name: 'delete',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(deleteSong, (state, _: PayloadAction<string>) => {
            state.status = 'pending'
        })

        .addCase(deleteSongSuccess, (state, action: PayloadAction<string>) => {
            state.deleteMessage = action.payload
            state.status = 'success'
        })

        .addCase(deleteSongFailure, (state, action: PayloadAction<unknown>) => {
            state.error = action.payload
            state.status = 'error'
        })
    }
})


export const [deleteSong, deleteSongSuccess, deleteSongFailure] = createAsyncActions<string>('delete/song')

export const selectStatus = (state: { deleteReducer: delteSongState }) => state.deleteReducer.status;
export const selectMessage = (state: { deleteReducer: delteSongState }) => state.deleteReducer.deleteMessage;
export const selectError = (state: { deleteReducer: delteSongState }) => state.deleteReducer.error;

export const { reducer: deleteReducer } = deleteSongSlice;