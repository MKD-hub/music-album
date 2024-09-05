import { fork } from 'redux-saga/effects';
import watchSongs from './getSongs.saga';
import watchGenres from './getGenre.saga';

function* rootSaga() {
  yield fork(watchSongs);
  yield fork(watchGenres);
}

export default rootSaga;
