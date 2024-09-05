import { put, call, takeLatest } from 'redux-saga/effects';
import {
    fetchSongs,
    fetchSongsByGenre,
    fetchSongsByArtist
} from '../../api/api';


import { fetchSongsFailure, fetchSongsSuccess } from '../song.slice';
import { fetchGenreSongSuccess, fetchGenreSongsFailure } from '../song.slice';
import { fetchArtistSongSuccess, fetchArtistSongsFailure } from '../song.slice';
import { ISong } from '../../api/song.type';
import { PayloadAction } from '@reduxjs/toolkit';

function* getSongs( action: PayloadAction<number> ) {
    try {
        // pending data fetch
        const songs: ISong[] = yield call(fetchSongs, action.payload);

        yield put(fetchSongsSuccess(songs));
    }
    catch (error: unknown) {
        yield put(fetchSongsFailure(error))
    }
}

function* getSongsByGenre(action: PayloadAction<string>) {
    try {
        const songs: ISong[] = yield call(fetchSongsByGenre, action.payload);

        yield put(fetchGenreSongSuccess(songs));
    }
    catch (error: unknown) {
        yield put(fetchGenreSongsFailure(error))
    }
}

function* getSongsByArtist(action: PayloadAction<string>) {
    try {
        const songs: ISong[] = yield call(fetchSongsByArtist, action.payload);

        yield put(fetchArtistSongSuccess(songs));
    }
    catch (error: unknown) {
        yield put(fetchArtistSongsFailure(error))
    }
}

function* watchSongs() {
    yield takeLatest('songs/fetch/get', getSongs);
    yield takeLatest('songs/fetch/genre/get', getSongsByGenre);
    yield takeLatest('songs/fetch/artist/get', getSongsByArtist)
}

export default watchSongs;