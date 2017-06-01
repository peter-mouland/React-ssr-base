import { fetch } from '../utils';

export const FETCH_TEAMS = 'FETCH_TEAMS';
export const FETCH_SEASONS = 'FETCH_SEASONS';
export const FETCH_PLAYERS = 'FETCH_PLAYERS';
export const FETCH_DASHBOARD_DATA = 'FETCH_DASHBOARD_DATA';
export const ADD_SEASON = 'ADD_SEASON';
export const ADD_LEAGUE = 'ADD_LEAGUE';
export const ADD_USER = 'ADD_USER';
export const UPDATE_PLAYERS = 'UPDATE_PLAYERS';
export const UPDATE_TEAM = 'UPDATE_TEAM';

export function fetchPlayers(player) {
  return {
    type: FETCH_PLAYERS,
    payload: fetch.graphQL('getPlayersQuery', player ? { player } : undefined)
  };
}

export function fetchTeam({ leagueId }) {
  return {
    type: FETCH_TEAMS,
    payload: fetch.graphQL('getTeamQuery', { leagueId })
  };
}

export function fetchDashboardData() {
  return {
    type: FETCH_DASHBOARD_DATA,
    payload: fetch.graphQL('getDashboardQuery')
  };
}

export function fetchSeasons() {
  return {
    type: FETCH_SEASONS,
    payload: fetch.graphQL('getSeasonsQuery')
  };
}

export function addSeason(name) {
  return {
    type: ADD_SEASON,
    payload: fetch.graphQL('addSeasonsMutation', { name })
  };
}

export function addLeague(seasonId, name) {
  return {
    type: ADD_LEAGUE,
    seasonId,
    payload: fetch.graphQL('addLeaguesMutation', { seasonId, name })
  };
}

export function addUser(seasonId, userDetails) {
  return {
    type: ADD_USER,
    seasonId,
    payload: fetch.graphQL('addUserMutation', { seasonId, ...userDetails })
  };
}

export function updatePlayers(playerUpdates) {
  return {
    type: UPDATE_PLAYERS,
    payload: fetch.graphQL('updatePlayersMutation', playerUpdates)
  };
}

export function updateTeam(team) {
  return {
    type: UPDATE_TEAM,
    payload: fetch.graphQL('updateTeamMutation', team)
  };
}
