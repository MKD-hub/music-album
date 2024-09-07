import { put, call, takeLatest } from 'redux-saga/effects';
import {
    fetchSongs,
    fetchSongsByGenre,
    fetchSongsByArtist
} from '../../api/api';


import { fetchSongsFailure, fetchSongsSuccess } from '../song.slice';
import { fetchArtistSongSuccess, fetchArtistSongsFailure } from '../song.slice';
import { ISong, Response } from '../../api/song.type';
import { PayloadAction } from '@reduxjs/toolkit';

function* getSongs( action: PayloadAction<number> ) {
    try {
        // pending data fetch
        const songs: Response = yield call(fetchSongs, action.payload);

        yield put(fetchSongsSuccess(songs));
    }
    catch (error: unknown) {
        yield put(fetchSongsFailure(error))
    }
}

function* getSongsByGenre(action: PayloadAction<string>) {
    try {
        const songs: Response = yield call(fetchSongsByGenre, action.payload);

        yield put(fetchSongsSuccess(songs));
    }
    catch (error: unknown) {
        yield put(fetchSongsFailure(error))
    }
}


function* watchSongs() {
    yield takeLatest('songs/fetch/get', getSongs);
    yield takeLatest('songs/fetch/genre/get', getSongsByGenre);
}

export default watchSongs;