import { call, put, takeEvery } from 'redux-saga/effects'

import {
    deleteSong
} from '../../api/api';


import { 
    deleteSongSuccess,
    deleteSongFailure
} from '../deleteSong.slice'

import { PayloadAction } from '@reduxjs/toolkit';
import { deleteFromList } from '../song.slice';

function* removeSong (action: PayloadAction<string>) {
    try {
        const message: string = yield call(deleteSong, action.payload)
        yield put(deleteSongSuccess(message))
        yield put(deleteFromList(action.payload))
    }
    catch (error: unknown) {
        yield put(deleteSongFailure(error))
    }
    
}


function* watchDeletion() {
    yield takeEvery('delete/song/get', removeSong);
}

export default watchDeletion;