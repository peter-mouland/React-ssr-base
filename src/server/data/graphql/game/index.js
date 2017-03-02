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


// This class implements the RandomDie GraphQL type
export class Game {
  constructor({ gameType, card1, card2 }) {
    this.gameType = gameType;
    this.card1 = card1;
    this.card2 = card2;
    const answerIndex = randomRange(0, 1, 1)[0];
    const factIndex = randomRange(0, 7, 1)[0];
    this.cards = Promise.all([this.card1Details(), this.card2Details()])
      .then((cards) => {
        this.wrongCard = cards[1 - answerIndex];
        this.answerCard = cards[answerIndex];
        this.answerKey = Object.keys(this.answerCard)[factIndex];
        return cards;
      });
  }

  card1Details() {
    return swapiData(this.gameType, this.card1);
  }

  card2Details() {
    return swapiData(this.gameType, this.card2);
  }

  question() {
    return this.cards.then((cards) => {
      const fact = this.answerCard[this.answerKey];
      const extra = fact > this.wrongCard[this.answerKey] ? 'taller' : 'smaller';
      const answerText = this.answerKey === 'height'
        ? `${extra}, ${cards[0].name} or ${cards[1].name}`
        : fact;
      return `Who's ${this.answerKey} is ${answerText}?`;
    });
  }

  answerId() {
    return this.cards.then(() => this.answerCard.url);
  }

  answer() {
    return this.cards.then(() => {
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
    });
  }
}

export default schema;


/*

use 'fragments' to reduce explicit query

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

