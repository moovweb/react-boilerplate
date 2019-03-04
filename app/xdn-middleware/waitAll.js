import { fork, all, join } from 'redux-saga/effects';

export default (sagas) => function* waitAll() {
  const tasks = yield all(
    sagas.map(([saga, ...params]) => fork(saga, ...params))
  )
  yield join(...tasks)
};