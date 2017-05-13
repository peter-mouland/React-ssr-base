import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debug from 'debug';

import { fetchPlayers } from '../../actions';

debug('base:Players');

const Error = ({ error }) => <div>
  <p>Error Loading cards!</p>
  <p>{ error.message }</p>
</div>;

const Loading = () => <p>Loading players....</p>;

class Players extends React.Component {

  static needs = [fetchPlayers];

  static propTypes = {
    players: PropTypes.array
  };

  static defaultProps = {
    players: []
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    if (this.props.players) return;
    this.props.fetchPlayers();
  }

  render() {
    const {
      errors = [], loading, players
    } = this.props;

    return (
      <div id="players">
        <banner className="header">
          <h1>Players</h1>
          <p>
            All Current Players.
          </p>
        </banner>
        <section>
          { loading && <Loading /> }
          { errors.map((error) => <Error error={error} />) }
          { players.map((player) => <div key={player.player}>{player.player}</div>) }
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.players.errors,
    loading: state.players.loading,
    players: state.players.players,
  };
}

export default connect(
  mapStateToProps,
  { fetchPlayers }
)(Players);
