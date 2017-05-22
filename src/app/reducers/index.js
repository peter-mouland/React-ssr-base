import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import debug from 'debug';

import * as actions from '../actions';

const log = debug('base:reducers/index');

export function promiseState(state = {}, action) {
  const splitAction = action.type.split('_');
  const postFix = splitAction.pop();
  const actionType = splitAction.join('_');
  switch (postFix) {
    case 'PENDING':
      return {
        ...state,
        loading: actionType
      };
    case 'FULFILLED':
      return {
        ...state,
        loading: false,
        errors: action.payload.errors,
        status: action.status
      };
    case 'REJECTED':
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

export function players(state = {}, action) {
  switch (action.type) {
    case `${actions.FETCH_PLAYERS}_FULFILLED`:
      return {
        ...state,
        data: action.payload.data && action.payload.data.getPlayers,
      };
    default:
      return state;
  }
}

export function seasons(state = {}, action) {
  switch (action.type) {
    case `${actions.FETCH_SEASONS}_FULFILLED`:
      return {
        ...state,
        data: action.payload.data && action.payload.data.getSeasons,
      };
    case `${actions.ADD_SEASON}_FULFILLED`:
      return {
        ...state,
        data: action.payload.data && action.payload.data.addSeason,
      };
    case `${actions.ADD_LEAGUE}_FULFILLED`:
      return {
        ...state,
        data: action.payload.data && action.payload.data.addLeague,
      };
    default:
      return state;
  }
}

export function dashboard(state = {}, action) {
  switch (action.type) {
    case `${actions.FETCH_DASHBOARD_DATA}_FULFILLED`:
      return {
        ...state,
        data: action.payload.data && action.payload.data.getDashboard.message,
      };
    default:
      return state;
  }
}

export default combineReducers({
  promiseState,
  seasons,
  players,
  dashboard,
  routing
});
