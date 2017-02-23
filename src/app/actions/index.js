import { json } from '../utils';

export const FETCH_ORDERS = 'FETCH_ORDERS';

export function fetchOrders() {
  return {
    type: FETCH_ORDERS,
    payload: json.get('api/orders')
  };
}
