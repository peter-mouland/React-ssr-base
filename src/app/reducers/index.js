import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import debug from 'debug';

import * as actions from '../actions';

const log = debug('base:reducers/index');

export function products(state = {}, action) {
  switch (action.type) {
    case `${actions.FETCH_PRODUCTS}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${actions.FETCH_PRODUCTS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        products: action.payload,
        status: action.status
      };
    default:
      return state;
  }
}

export default combineReducers({
  products,
  routing
});
