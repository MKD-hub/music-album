import { put, call, takeLatest } from 'redux-saga/effects';
import {
    postSong
} from '../../api/api';

import { ISong } from '../../api/song.type';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSongFailure, createSongSuccess } from '../createSong.slice';
import { updateList } from '../song.slice';


function* createSong( action: PayloadAction<ISong> ) {
    try {
        const newSong: ISong = yield call(postSong, action.payload);

        yield put(createSongSuccess(newSong))

        yield put(updateList(newSong))

    }  
    catch (error: unknown) {
        yield put(createSongFailure(error))
    }
}

function* watchCreatedSong() {
    yield takeLatest('songs/post/get', createSong)
}

export default watchCreatedSong;