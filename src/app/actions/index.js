import { fetch } from '../utils';

export const FETCH_TEAM = 'FETCH_TEAM';
export const FETCH_SEASONS = 'FETCH_SEASONS';
export const FETCH_PLAYERS = 'FETCH_PLAYERS';
export const FETCH_DASHBOARD_DATA = 'FETCH_DASHBOARD_DATA';
export const ADD_SEASON = 'ADD_SEASON';
export const ADD_LEAGUE = 'ADD_LEAGUE';

const getPlayersQuery = `
query ($player: String) { 
  getPlayers(player: $player){ 
    code pos player club
    stats { 
      apps subs goals assists mom cs con penSvd yellows reds 
    }
    points { 
      total
      gw0 gw1 gw2 gw3 gw4 gw5 gw6 gw7 gw8 gw9 
      gw10 gw11 gw12 gw13 gw14 gw15 gw16 gw17 gw18 gw19 
      gw20 gw21 gw22 gw23 gw24 gw25 gw26 gw27 gw28 gw29
      gw30 gw31 gw32 gw33 gw34 gw35
    }
 }
} 
`;

const getDashboardQuery = `
  query { getDashboard{ message } } 
`;

const getSeasonsQuery = `
  query { getSeasons{ _id name currentGW isLive leagues { _id name } } } 
`;

const addSeasonsQuery = `
  mutation ($name: String) { addSeason(name: $name){ _id name currentGW isLive leagues { _id name } } }
`;

const addLeaguesQuery = `
  mutation ($seasonId: String, $name: String) { addLeague(seasonId: $seasonId, name: $name){ _id name currentGW isLive leagues { _id name } } }
`;

const getTeamQuery = `
  query ($manager: String) { getTeam(manager: $manager){ team } } 
`;

export function fetchPlayers(player) {
  return {
    type: FETCH_PLAYERS,
    payload: fetch.graphQL(getPlayersQuery, player ? { player } : undefined)
  };
}


export function fetchTeam(manager) {
  return {
    type: FETCH_TEAM,
    payload: fetch.graphQL(getTeamQuery, manager)
  };
}

export function fetchDashboardData() {
  return {
    type: FETCH_DASHBOARD_DATA,
    payload: fetch.graphQL(getDashboardQuery)
  };
}

export function fetchSeasons() {
  return {
    type: FETCH_SEASONS,
    payload: fetch.graphQL(getSeasonsQuery)
  };
}

export function addSeason(name) {
  return {
    type: ADD_SEASON,
    payload: fetch.graphQL(addSeasonsQuery, { name })
  };
}

export function addLeague(seasonId, name) {
  return {
    type: ADD_LEAGUE,
    payload: fetch.graphQL(addLeaguesQuery, { seasonId, name })
  };
}
