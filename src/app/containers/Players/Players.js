import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debug from 'debug';
import bemHelper from 'react-bem-helper';

import { fetchPlayers } from '../../actions';
import { PositionLinks, PositionButtons } from '../../components/Positions/Positions';
import './players.scss';

const bem = bemHelper({ name: 'unknown-players' });
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
      error: false,
      isSaving: false,
      playersToUpdate: {},
      playersUpdated: {},
      position: ''
    };
    this.SavePlayerPositions = this.SavePlayerPositions.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.changePos = this.changePos.bind(this);
  }

  componentDidMount() {
    if (this.props.players) return;
    this.props.fetchPlayers();
  }

  updatePosition(player, pos) {
    this.setState({
      playersToUpdate: {
        ...this.state.playersToUpdate,
        [player.player]: {
          code: player.code,
          pos,
          player: player.player,
          club: player.club
        }
      }
    });
  }

  SavePlayerPositions() {
    this.setState({
      isSaving: true
    });
    // this.props.savePlayerPositions(this.state.playersToUpdate)
    //   .then(() => {
    //     this.setState({
    //       isSaving: false,
    //       playersToUpdate: {}
    //     });
    //   });
  }

  changePos(e, position) {
    e.preventDefault();
    this.setState({ position });
  }

  render() {
    const { players, loading, errors = [] } = this.props;
    const { isSaving, position } = this.state;

    const Save = (isSaving)
      ? <em>Saving Players Positions...</em>
      : <button onClick={this.SavePlayerPositions} >Save Players Positions</button>;

    const filteredPlayers = players.filter((player) => player.pos === position);
    return (
      <div { ...bem() } id="players">
        <banner className="header">
          <h2>Players by position</h2>
        </banner>
        <section>
          { loading && <Loading /> }
          { errors.map((error) => <Error error={error} />) }
        </section>
        <div>
          <strong>View:</strong>
          <PositionLinks onClick={ this.changePos } selectedPos={ position } />
        </div>
        {filteredPlayers.length ? Save : null}
        <ul { ...bem('list') }>
          {filteredPlayers
            .map((player) => {
              const update = this.state.playersToUpdate[player.fullName];
              const selectedPos = (!update && player.pos) || (update && update.pos);
              return (
                <li { ...bem('item') } id={player.code} key={player.code} >
                  {player.player}, {player.club}
                  {
                    (player.pos === 'unknown') ?
                      <PositionButtons selectedPos={ selectedPos }
                                       onClick={ (e, pos) => this.updatePosition(player, pos) } />
                      : null
                  }
                </li>
              );
            })
          }
        </ul>
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
