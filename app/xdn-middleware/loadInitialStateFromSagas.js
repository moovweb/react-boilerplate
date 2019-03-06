import get from 'lodash/get'
import { fork, all, join } from 'redux-saga/effects';

export default function loadInitialStateFromSagas({ component, routeProps, store }) {
  const getInitialSagas = get(component, 'getInitialSagas', () => [])
  const sagas = getInitialSagas(routeProps)
  const runSagas = store.runSaga(waitAll(sagas))
  store.close()
  return runSagas.done
}

const waitAll = (sagas) => function*() {
  const tasks = yield all(
    sagas.map(([saga, ...params]) => fork(saga, ...params))
  )
  yield join(...tasks)
};