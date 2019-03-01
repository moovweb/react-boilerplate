/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_PRODUCT } from 'containers/ProductPage/constants';
import request from 'utils/request';
import { productLoaded } from '../App/actions';

/**
 * Github repos request/response handler
 */
export function* getProduct({ id }) {
  const product = yield call(request, `/api/p/${id}.json`);
  yield put(productLoaded(product));
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* productData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_PRODUCT, getProduct);
}
