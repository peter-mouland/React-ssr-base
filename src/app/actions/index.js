import { randomRange, fetch } from '../utils';

export const FETCH_PEOPLE_CARDS = 'FETCH_PEOPLE_CARDS';
export const FETCH_DASHBOARD_DATA = 'FETCH_DASHBOARD_DATA';

const getGameQuery = `
query ($gameType: String!, $card1: Int!, $card2: Int!) { getGame(gameType: $gameType card1: $card1 card2: $card2){ answerId, cards { ...cardInfo }, question, answer } } 
 
fragment cardInfo on GameCard {
 birth_year
 created
 edited
 eye_color
 films
 gender
 hair_color
 height
 homeworld
 mass
 name
 skin_color
 species
 starships
 url
 vehicles
}
`;

const getDashboardQuery = `
  query { getDashboard{ message } } 
`;

export function fetchPeopleCards() {
  const DECK = 87;
  const cards = randomRange(1, DECK, 2);
  return {
    type: FETCH_PEOPLE_CARDS,
    payload: fetch.graphQL(getGameQuery, { gameType: 'people', card1: cards[0], card2: cards[1] })
  };
}

export function fetchDashboardData() {
  return {
    type: FETCH_DASHBOARD_DATA,
    payload: fetch.graphQL(getDashboardQuery)
  };
}
