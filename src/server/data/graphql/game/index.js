import { buildSchema } from 'graphql';

import { randomRange } from '../../../../app/utils';
import { swapiData } from '../../3rd-party/swapi';

const schema = buildSchema(`
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

  type Query {
    getGame(gameType: String, card1: Int, card2: Int): Game
  }
`);

export class Game {
  constructor(cards) {
    const answerIndex = randomRange(0, 1, 1)[0];
    const factIndex = randomRange(0, 7, 1)[0];
    this.cards = cards;
    this.card1 = this.cards[0];
    this.card2 = this.cards[1];
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
      case (wrongAnswer === 'unknown' && wrongAnswer !== answer) :
        return 'unknown';
      case (wrongAnswer === answer) :
        return 'both';
      default :
        return this.answerCard.name;
    }
  }
}
// The root provides the top-level API endpoints
export const getGame = ({ gameType, card1, card2 }) => {
  return  Promise.all([swapiData(gameType, card1), swapiData(gameType, card2)]).then(cards => new Game(cards));
};

export default schema;

/* use 'fragments' to reduce explicit query

POST http://localhost:3000/graphql/v1
Content-Type application/graphql

 query { getGame(gameType: "people" card1: 63 card2: 50){ answerId, cards {
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
 vehicles }, question, answer } }

 */

