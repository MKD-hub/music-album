import { Action, configureStore, ThunkAction, Tuple } from "@reduxjs/toolkit";
import createSagaMiddleWare from 'redux-saga';
import rootSaga from "./sagas/root";
import { songsReducer } from "./song.slice";
import { genreReducer } from "./genres.slice";
import { createSongReducer } from "./createSong.slice";
import { deleteReducer } from "./deleteSong.slice";
import { updateReducer } from "./updateSong.slice";

const sagaMiddleWare = createSagaMiddleWare();

const Store = configureStore({
    reducer: {
        songsReducer,
        genreReducer,
        createSongReducer,
        deleteReducer,
        updateReducer
    },
    middleware: () => new Tuple(sagaMiddleWare)
})

sagaMiddleWare.run(rootSaga);


export type AppStore = typeof Store
export type RootState = ReturnType<AppStore['getState']>

export type AppDispatch = AppStore['dispatch']

export type AppThunk<ThunkReturnType = void> = ThunkAction<
ThunkReturnType,
RootState,
unknown,
Action
>

export default Store;