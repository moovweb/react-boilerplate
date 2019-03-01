import { initialState } from './reducer';

const selectProduct = state => state.get('product', initialState);

export { selectProduct };
