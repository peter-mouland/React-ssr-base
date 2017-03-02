import schema, { Game } from './game';

// The root provides the top-level API endpoints
export const root = {
  getGame(gameType, card1, card2) {
    return new Game(gameType, card1, card2);
  }
};


export default schema;

