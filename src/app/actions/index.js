import { json } from '../utils';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export function fetchProducts() {
  return {
    type: FETCH_PRODUCTS,
    payload: json.get('api/products')
  };
}
