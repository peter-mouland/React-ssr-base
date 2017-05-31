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

// const playerStatsFragment = `
// fragment playerStatsInfo on Player {
//  gameWeek {
//    stats {
//      apps subs gls asts mom cs con pensv ycard rcard
//    }
//    points {
//      apps subs gls asts mom cs con pensv ycard rcard total
//    }
//  }
//  total {
//    stats {
//      apps subs gls asts mom cs con pensv ycard rcard
//    }
//    points {
//      apps subs gls asts mom cs con pensv ycard rcard total
//    }
//  }
// }`;

const playerFragment = `
fragment playerInfo on Player {
  _id code pos name club
}`;

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

const getPlayersQuery = `
${playerFragment}
query ($player: String) { 
  getPlayers(player: $player){ 
    ...playerInfo
 }
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
  mutation ($seasonId: String, $name: String) { 
    addLeague(seasonId: $seasonId, name: $name){ ...leagueInfo } 
  }
`;

const addUserMutation = `
  ${teamFragment}
  mutation ($seasonId: String, $leagueId: String, $name: String, $email: String) { 
    addUser(seasonId: $seasonId, leagueId: $leagueId, name: $name, email: $email){ ...teamInfo  } 
  }
`;

const updatePlayersMutation = `
  mutation ($playerUpdates: [PlayerUpdates]) { 
    updatePlayers(playerUpdates: $playerUpdates){ id code pos name club }   
  }
`;

const updateTeamMutation = `
  mutation ($teamUpdate: TeamUpdate) { 
    updateTeam(teamUpdate: $teamUpdate){ id code pos name club }   
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
    seasonId,
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

export function updatePlayers(playerUpdates) {
  return {
    type: UPDATE_PLAYERS,
    payload: fetch.graphQL(updatePlayersMutation, playerUpdates)
  };
}

export function updateTeam(team) {
  return {
    type: UPDATE_TEAM,
    payload: fetch.graphQL(updateTeamMutation, team)
  };
}
