import { fromJS } from 'immutable';
import { LOAD_PRODUCT } from './constants';

function productReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_PRODUCT:
    default:
      return state;
  }
}

export default productReducer;
