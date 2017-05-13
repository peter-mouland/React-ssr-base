import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import debug from 'debug';

import * as actions from '../actions';

const log = debug('base:reducers/index');

export function players(state = {}, action) {
  switch (action.type) {
    case `${actions.FETCH_PLAYERS}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${actions.FETCH_PLAYERS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors,
        players: action.payload.data && action.payload.data.getPlayers,
        status: action.status
      };
    case `${actions.FETCH_PLAYERS}_REJECTED`:
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
        secretData: action.payload.data && action.payload.data.getDashboard.message,
        status: action.status
      };
    case `${actions.FETCH_PLAYERS}_REJECTED`:
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
  players,
  dashboard,
  routing
});
