import { put, call, takeLatest } from 'redux-saga/effects';

import {
    fetchGenres,
} from '../../api/api';

import { fetchGenreSuccess, fetchGenresFailure } from '../genres.slice';
import { IGenre } from '../../api/song.type';

function* getGenres() {
    try {
        const genres: IGenre[] = yield call(async () => await fetchGenres());
        yield put(fetchGenreSuccess(genres))
    }
    catch (error: unknown) {
        yield put(fetchGenresFailure(error));
    }
}

function* watchGenres() {
    yield takeLatest('genres/fetch/get', getGenres);
}

export default watchGenres;