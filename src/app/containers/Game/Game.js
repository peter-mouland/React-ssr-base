import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debug from 'debug';

import Question from '../../components/Question/Question';
import Answer from '../../components/Answer/Answer';
import { fetchPeopleCards } from '../../actions';
import chevron from '../../../assets/chevron.svg';
import Svg from '../../components/Svg/Svg';

debug('base:Game');

const Error = ({ error }) => <div>
  <p>Error Loading cards!</p>
  <p>{ error.message }</p>
</div>;

const Dealing = () => <p>Loading cards....</p>;

class Game extends React.Component {
  static needs = [fetchPeopleCards];

  static propTypes = {
    hand: PropTypes.object
  };

  static defaultProps = {
    hand: { }
  };

  constructor(props) {
    super(props);
    this.state = {
      showAnswer: false,
      attempt: null
    };
    this.deal = this.deal.bind(this);
    this.viewAnswer = this.viewAnswer.bind(this);
    this.setAttempt = this.setAttempt.bind(this);
  }

  componentDidMount() {
    if (this.props.hand.cards) return;
    this.props.fetchPeopleCards();
  }

  deal() {
    this.setState({
      showAnswer: false,
      attempt: null
    });
    this.props.fetchPeopleCards();
  }

  setAttempt(attempt) {
    this.setState({ attempt });
  }

  viewAnswer() {
    this.setState({ showAnswer: true });
  }

  render() {
    const {
      errors = [], loading, hand: {
        cards = [], question, answer, answerId
      } = {}
    } = this.props;
    const { showAnswer, attempt } = this.state;
    return (
      <div id="game">
        <banner className="header">
          <h1>Star Wars Trivia</h1>
          <p>
            <Svg markup={chevron} />
            A simple game using <a href="http://www.swapi.com" target="_blank">SWAPI</a>.
          </p>
        </banner>
        <button onClick={() => this.deal()}>Ask another!</button>
        {errors.map((error, i) => <Error key={`error-${i}`} error={error} />)}
        {loading
          ? <Dealing />
          : <Question { ...{
 showAnswer, answer, cards, attempt, onClick: this.setAttempt
} }>
            {question}
          </Question>
        }
        {!!cards.length && <button onClick={() => this.viewAnswer()}>View Answer</button>}
        <Answer cards={ cards } answerId={ answerId } showAnswer={ showAnswer } />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.game.errors,
    loading: state.game.loading,
    hand: state.game.hand,
  };
}

export default connect(
  mapStateToProps,
  { fetchPeopleCards }
)(Game);
