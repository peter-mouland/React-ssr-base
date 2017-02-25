import { randomRange, json } from '../utils';
// import Auth from '../authentication/auth-helper';

export const FETCH_PEOPLE_CARDS = 'FETCH_PEOPLE_CARDS';
export const FETCH_DASHBOARD_DATA = 'FETCH_DASHBOARD_DATA';

export function fetchPeopleCards() {
  const DECK = 87;
  const cards = randomRange(1, DECK, 2);
  return {
    type: FETCH_PEOPLE_CARDS,
    payload: json.get(`api/game/people/${cards[0]}/${cards[1]}`)
  };
}

export function fetchDashboardData() {
  const token = '';// Auth.getToken();
  return {
    type: FETCH_DASHBOARD_DATA,
    payload: json.get('api/dashboard', {
      headers: token ? { Authorization: `Bearer ${token}` } : false
    })
  };
}
