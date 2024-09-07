import { fork } from 'redux-saga/effects';
import watchSongs from './getSongs.saga';
import watchGenres from './getGenre.saga';
import watchCreatedSong from './postSong.saga';
import watchDeletion from './deleteSong.saga';
import watchUpdate from './updateSong.saga';

function* rootSaga() {
  yield fork(watchSongs);
  yield fork(watchGenres);
  yield fork(watchCreatedSong);
  yield fork(watchDeletion);
  yield fork(watchUpdate);
}

export default rootSaga;
