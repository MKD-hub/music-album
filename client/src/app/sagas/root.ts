import { fork } from 'redux-saga/effects';
import watchSongs from './getSongs.saga';
import watchGenres from './getGenre.saga';
import watchCreatedSong from './postSong.saga';

function* rootSaga() {
  yield fork(watchSongs);
  yield fork(watchGenres);
  yield fork(watchCreatedSong);
}

export default rootSaga;
