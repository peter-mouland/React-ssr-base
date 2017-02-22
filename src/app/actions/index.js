import { randomRange, json } from '../utils';

export const FETCH_PEOPLE_CARDS = 'FETCH_PEOPLE_CARDS';

export function fetchPeopleCards() {
  const DECK = 87;
  const cards = randomRange(1, DECK, 2);
  return {
    type: FETCH_PEOPLE_CARDS,
    payload: json.get(`api/game/people/${cards[0]}/${cards[1]}`)
  };
}
