import { fetch } from '../utils';

export const FETCH_TEAMS = 'FETCH_TEAMS';
export const FETCH_SEASONS = 'FETCH_SEASONS';
export const FETCH_PLAYERS = 'FETCH_PLAYERS';
export const FETCH_DASHBOARD_DATA = 'FETCH_DASHBOARD_DATA';
export const ADD_SEASON = 'ADD_SEASON';
export const ADD_LEAGUE = 'ADD_LEAGUE';
export const ADD_USER = 'ADD_USER';

const getPlayersQuery = `
query ($player: String) { 
  getPlayers(player: $player){ 
    code pos name club
    gameWeek {
      stats { 
        apps subs gls asts mom cs con pensv ycard rcard 
      }
      points {
        apps subs gls asts mom cs con pensv ycard rcard total
      }
    }
    total {
      stats { 
        apps subs gls asts mom cs con pensv ycard rcard 
      }
      points {
        apps subs gls asts mom cs con pensv ycard rcard total
      }
    }
 }
} 
`;

const leagueFragment = `
fragment leagueInfo on League {
  _id name tier
}`;


const teamFragment = `
fragment teamInfo on Team {
  _id user { id name } season { id name } league { id name } name
}`;

const seasonFragment = `
${leagueFragment}
fragment seasonInfo on Season {
  _id name currentGW isLive leagues { ...leagueInfo }
}
`;

const getDashboardQuery = `
  query { getDashboard{ message } } 
`;

const getSeasonsQuery = `
  ${seasonFragment}
  query { getSeasons{ ...seasonInfo } }
`;

const getTeamQuery = `
  ${teamFragment}
  query { getTeams{ ...teamInfo } } 
`;

const addSeasonsMutation = `
  ${seasonFragment}
  mutation ($name: String) { addSeason(name: $name){ ...seasonInfo } }
`;

const addLeaguesMutation = `
  ${leagueFragment}
  mutation ($seasonId: String, $name: String) { addLeague(seasonId: $seasonId, name: $name){ ...leagueInfo } }
`;

const addUserMutation = `
  ${teamFragment}
  mutation ($seasonId: String, $leagueId: String, $name: String, $email: String) { 
    addUser(seasonId: $seasonId, leagueId: $leagueId, name: $name, email: $email){ ...teamInfo  } 
  }
`;

export function fetchPlayers(player) {
  return {
    type: FETCH_PLAYERS,
    payload: fetch.graphQL(getPlayersQuery, player ? { player } : undefined)
  };
}

export function fetchTeams(manager) {
  return {
    type: FETCH_TEAMS,
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
    payload: fetch.graphQL(addSeasonsMutation, { name })
  };
}

export function addLeague(seasonId, name) {
  return {
    type: ADD_LEAGUE,
    payload: fetch.graphQL(addLeaguesMutation, { seasonId, name })
  };
}

export function addUser(seasonId, userDetails) {
  return {
    type: ADD_USER,
    seasonId,
    payload: fetch.graphQL(addUserMutation, { seasonId, ...userDetails })
  };
}
