import { LOAD_PRODUCT } from './constants';

export function loadProduct(id) {
  return {
    type: LOAD_PRODUCT,
    id,
  };
}
