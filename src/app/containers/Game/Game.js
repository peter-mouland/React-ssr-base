import React from 'react';
import debug from 'debug';
import { connect } from 'react-redux';

import Question from '../../components/Question/Question';
import Answer from '../../components/Answer/Answer';
import { fetchPeopleCards } from '../../actions';
import chevron from '../../../assets/chevron.svg';
import Svg from '../../components/Svg/Svg';

debug('lego:Game');

const Error = () => <p>Error Loading cards!</p>;
const Dealing = () => <p>Loading cards....</p>;

class Game extends React.Component {

  static needs = [fetchPeopleCards];

  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      error: false,
      dealing: false,
      showAnswer: false,
      attempt: null
    };
    this.deal = this.deal.bind(this);
    this.viewAnswer = this.viewAnswer.bind(this);
    this.setAttempt = this.setAttempt.bind(this);
  }

  componentDidMount() {
    if (this.props.cards) return;
    this.fetchCards();
  }

  fetchCards() {
    this.props.fetchPeopleCards()
      .then(() => {
        this.setState({
          error: false,
          dealing: false
        });
      })
      .catch(() => {
        this.setState({
          error: true,
          dealing: false
        });
      });
  }

  deal() {
    const cards = this.props.cards;
    const QandA = this.props.QandA;
    this.setState({
      QandA,
      cards,
      dealing: false,
      error: false,
      showAnswer: false,
      attempt: null
    });
    this.fetchCards();
  }

  setAttempt(attempt) {
    this.setState({ attempt });
  }

  viewAnswer() {
    this.setState({ showAnswer: true });
  }

  render() {
    const {
      cards, dealing, error, showAnswer, attempt, QandA: { answerCard, question, answer } = {},
    } = this.state;

    return (
      <div id="game">
        <banner className="header">
          <h1>Star Wars Trivia</h1>
          <p><Svg markup={chevron} />A simple game using <a href="http://www.swapi.com" target="_blank">SWAPI</a>.</p>
        </banner>
        <button onClick={() => this.deal()}>Deal 'People' cards!</button>
        {error && <Error />}
        {dealing && <Dealing />}
        <Question { ...{ showAnswer, answer, cards, attempt, onClick: this.setAttempt } }>
          {question}
        </Question>
        {!!cards.length && <button onClick={() => this.viewAnswer()}>View Answer</button>}
        <Answer cards={ cards } answerCard={ answerCard } showAnswer={ showAnswer } />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cards: state.game.cards,
    QandA: state.game.QandA
  };
}

export default connect(
  mapStateToProps,
  { fetchPeopleCards }
)(Game);
