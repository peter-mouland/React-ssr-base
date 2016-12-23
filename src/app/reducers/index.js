import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import debug from 'debug';

import { randomRange } from '../utils';
import * as actions from '../actions';
import getQuestionAndAnswer from './get-question-and-answers';

const log = debug('lego:reducers/index');

function game(state = {}, action) {
  const answerInt = randomRange(0, 1, 1)[0];
  const factInt = randomRange(0, 7, 1)[0];
  switch (action.type) {
    case `${actions.FETCH_PEOPLE_CARDS}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${actions.FETCH_PEOPLE_CARDS}_FULFILLED`:
      return {
        ...state,
        cards: action.payload,
        QandA: getQuestionAndAnswer({ cards: action.payload, answerInt, factInt }),
        status: action.status
      };
    default:
      return state;
  }
}

export default combineReducers({
  game,
  routing
});
