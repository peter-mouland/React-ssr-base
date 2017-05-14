import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import debug from 'debug';

import * as actions from '../actions';

const log = debug('base:reducers/index');

export function actionState(state = {}, action) {
  const splitAction = action.type.split('_');
  const postFix = splitAction[splitAction.length - 1];
  switch (postFix) {
    case `PENDING`:
      return {
        ...state,
        loading: true
      };
    case `FULFILLED`:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors,
        status: action.status
      };
    case `REJECTED`:
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
  players,
  dashboard,
  actionState,
  routing
});
