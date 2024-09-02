import { fork } from 'redux-saga/effects';
import watchSongs from './getSongs.saga';

function* rootSaga() {
  yield fork(watchSongs);
}

export default rootSaga;
