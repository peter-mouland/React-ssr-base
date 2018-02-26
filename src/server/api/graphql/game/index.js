import debug from 'debug';

import { randomRange, json } from '../../../../app/utils';

const log = debug('base:graphql/game');
const getSwapiData = (api, id) => json.get(`http://swapi.co/api/${api}/${id}/`);

const schema = (`
  type GameCard {
    birth_year : String
    created : String
    edited : String
    eye_color : String
    films : [String]
    gender : String
    hair_color : String
    height : String
    homeworld : String 
    mass : String
    name : String
    skin_color : String
    species : [String]
    starships : [String]
    url : String
    vehicles : [String] 
  }

  type Game {
    gameType: String!
    question: String
    answer: String
    cards: [GameCard]
    question: String
    answerId: String,
    answer: String
  }
`);

export const gameQuery = `
  getGame(gameType: String, card1: Int, card2: Int): Game
`;

export class Game {
  constructor(cards = []) {
    if (cards.length < 2) {
      throw new Error('You needs more than 2 cards to play a game');
    }
    const answerIndex = randomRange(0, 1, 1)[0];
    const factIndex = randomRange(0, 7, 1)[0];
    this.cards = cards;
    this.card1 = this.cards[0]; // eslint-disable-line prefer-destructuring
    this.card2 = this.cards[1]; // eslint-disable-line prefer-destructuring
    this.wrongCard = this.cards[1 - answerIndex];
    this.answerCard = this.cards[answerIndex];
    this.answerKey = Object.keys(this.answerCard)[factIndex];
  }

  question() {
    const fact = this.answerCard[this.answerKey];
    const extra = fact > this.wrongCard[this.answerKey] ? 'taller' : 'smaller';
    const answerText = this.answerKey === 'height'
      ? `${extra}, ${this.cards[0].name} or ${this.cards[1].name}`
      : fact;
    return `Who's ${this.answerKey} is ${answerText}?`;
  }

  answerId() {
    return this.answerCard.url;
  }

  answer() {
    const wrongAnswer = this.wrongCard[this.answerKey];
    const answer = this.answerCard[this.answerKey];
    switch (true) {
      case (wrongAnswer === 'unknown' && wrongAnswer !== answer):
        return 'unknown';
      case (wrongAnswer === answer):
        return 'both';
      default:
        return this.answerCard.name;
    }
  }
}

export const getGame = ({ gameType, card1, card2 }) => {
  const promises = [getSwapiData(gameType, card1), getSwapiData(gameType, card2)];
  return Promise.all(promises).then((cards) => new Game(cards));
};

export default schema;
