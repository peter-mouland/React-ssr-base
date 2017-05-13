import { fetch } from '../utils';

export const FETCH_PLAYERS = 'FETCH_PLAYERS';
export const FETCH_DASHBOARD_DATA = 'FETCH_DASHBOARD_DATA';

const getPlayersQuery = `
query ($player: String) { getPlayers(player: $player){ code pos player club stats { 
    apps
    subs
    gls
    assists
    mom
    cs
    con
    penSvd
    yellows
    reds
     }  } } 
`;

const getDashboardQuery = `
  query { getDashboard{ message } } 
`;

export function fetchPlayers(player) {
  return {
    type: FETCH_PLAYERS,
    payload: fetch.graphQL(getPlayersQuery, player ? { player } : undefined)
  };
}

export function fetchDashboardData() {
  return {
    type: FETCH_DASHBOARD_DATA,
    payload: fetch.graphQL(getDashboardQuery)
  };
}
