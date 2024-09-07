import { call, put, takeLatest } from 'redux-saga/effects'

import { updateSong } from '../../api/api'
import { ISong } from '../../api/song.type'
import { PayloadAction } from '@reduxjs/toolkit'
import { updateSongFailure, updateSongSuccess } from '../updateSong.slice';
import { updateSingleSong } from '../song.slice';

type PartialSongAction = PayloadAction<Partial<ISong>>

function* update(action: PartialSongAction) {
    try {
        const song: ISong = yield call(updateSong, action);
        yield put(updateSongSuccess(song));

        yield put(updateSingleSong(song));
    }
    catch (error: unknown) {
        yield put(updateSongFailure(error))
    }

}

function* watchUpdate() {
    yield takeLatest('update/song/get', update);
}

export default watchUpdate;