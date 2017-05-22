import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debug from 'debug';
import bemHelper from 'react-bem-helper';

import { fetchTeam } from '../../actions';
import { PositionLinks, PositionButtons } from '../../components/Positions/Positions';
import './my-team.scss';

const bem = bemHelper({ name: 'my-team' });
debug('base:Players');

class MyTeam extends React.Component {

  static needs = [];

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
    // if (this.props.players.length > 0) return;
    // this.props.fetchPlayers();
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
    errors: state.promiseState.errors,
    loading: state.promiseState.loading,
    team: state.team.data,
  };
}

export default connect(
  mapStateToProps,
  { fetchTeam }
)(MyTeam);
