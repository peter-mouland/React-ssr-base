import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import debug from 'debug';

import * as actions from '../actions';

const log = debug('base:reducers/index');

export function game(state = {}, action) {
  switch (action.type) {
    case `${actions.FETCH_PEOPLE_CARDS}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${actions.FETCH_PEOPLE_CARDS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors,
        hand: action.payload.data && action.payload.data.getGame,
        status: action.status
      };
    case `${actions.FETCH_PEOPLE_CARDS}_REJECTED`:
      return {
        ...state,
        loading: false,
        errors: [action.payload],
        status: action.status
      };
    default:
      return state;
  }
}

export function dashboard(state = {}, action) {
  switch (action.type) {
    case `${actions.FETCH_DASHBOARD_DATA}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${actions.FETCH_DASHBOARD_DATA}_FULFILLED`:
      return {
        ...state,
        loading: false,
        secretData: action.payload.message,
        status: action.status
      };
    case `${actions.FETCH_PEOPLE_CARDS}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: action.payload,
        status: action.status
      };
    default:
      return state;
  }
}

export default combineReducers({
  game,
  dashboard,
  routing
});
