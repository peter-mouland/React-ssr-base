import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import debug from 'debug';

import * as actions from '../actions';

const log = debug('base:reducers/index');

const addLeagueToState = (state, seasonId, newLeague) => {
  const newState = {
    ...state
  };
  const season = newState.data.find((ssn) => ssn.id === seasonId);
  season.leagues.push(newLeague);
  return newState;
};

function clean(obj) { // remove null's
  const newObj = {};

  Object.keys(obj).forEach((key) => {
    const val = obj[key];
    if (!val) return;
    newObj[key] = val;
  });

  return newObj;
}

const updatePlayersData = (state, action) => {
  const allPlayers = [...state.data];
  const updates = action.payload.data && action.payload.data.updatePlayers;
  updates.forEach((update) => {
    const cleanUpdate = clean(update);
    allPlayers.find((player, i) => { // eslint-disable-line array-callback-return
      if (player._id === update.id) { // eslint-disable-line no-underscore-dangle
        allPlayers[i] = { ...player, ...cleanUpdate };
      }
    });
  });
  return allPlayers;
};

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
    case `${actions.UPDATE_PLAYERS}_FULFILLED`:
      return {
        ...state,
        data: updatePlayersData(state, action)
      };
    default:
      return state;
  }
}

export function seasons(state = {}, action) {
  const newSeason = action.payload && action.payload.data && action.payload.data.addSeason;
  const newLeague = action.payload && action.payload.data && action.payload.data.addLeague;
  switch (action.type) {
    case `${actions.FETCH_SEASONS}_FULFILLED`:
      return {
        ...state,
        data: action.payload.data && action.payload.data.getSeasons,
      };
    case `${actions.ADD_SEASON}_FULFILLED`:
      return {
        ...state,
        data: [
          ...state.data,
          newSeason
        ]
      };
    case `${actions.ADD_LEAGUE}_FULFILLED`:
      return addLeagueToState(state, action.seasonId, newLeague);
    default:
      return state;
  }
}

export function teams(state = {}, action) {
  const newUser = action.payload && action.payload.data && action.payload.data.addUser;
  const updatedTeam = action.payload && action.payload.data && action.payload.data.updateTeam;
  switch (action.type) {
    case `${actions.FETCH_TEAMS}_FULFILLED`:
      return {
        ...state,
        errors: action.payload.errors,
        data: action.payload.data && action.payload.data.getTeams,
      };
    case `${actions.ADD_USER}_FULFILLED`:
      return {
        ...state,
        errors: action.payload.errors,
        data: [
          ...state.data,
          newUser
        ],
      };
    case `${actions.UPDATE_TEAM}_FULFILLED`:
      return {
        ...state,
        errors: action.payload.errors,
        data: updatedTeam,
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
  teams,
  players,
  dashboard,
  routing
});
