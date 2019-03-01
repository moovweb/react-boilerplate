import { fromJS } from 'immutable';
import { LOAD_PRODUCT } from './constants';

export const initialState = fromJS({
  id: null,
});

function productReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PRODUCT:
    default:
      return state;
  }
}

export default productReducer;
