import { fetch } from '../utils';

export const FETCH_PLAYERS = 'FETCH_PLAYERS';
export const FETCH_DASHBOARD_DATA = 'FETCH_DASHBOARD_DATA';

const getPlayersQuery = `
query ($player: String) { 
  getPlayers(player: $player){ 
    code pos player club
    stats { 
      apps subs goals assists mom cs con penSvd yellows reds 
    }
    points { 
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
