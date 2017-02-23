import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import debug from 'debug';

import * as actions from '../actions';

const log = debug('base:reducers/index');

export function orders(state = {}, action) {
  switch (action.type) {
    case `${actions.FETCH_ORDERS}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${actions.FETCH_ORDERS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        orders: action.payload,
        status: action.status
      };
    default:
      return state;
  }
}

export default combineReducers({
  orders,
  routing
});
