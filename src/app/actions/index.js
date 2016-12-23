import api from '../api';
import { randomRange } from '../utils';

export const FETCH_PEOPLE_CARDS = 'FETCH_PEOPLE_CARDS';
const DECK = 87;

export function fetchPeopleCards() {
  const cards = randomRange(1, DECK, 2);
  return {
    type: FETCH_PEOPLE_CARDS,
    payload: api.fetchCards('people', cards)
  };
}
