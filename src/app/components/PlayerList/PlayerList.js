import React from 'react';
import PropTypes from 'prop-types';
import bemHelper from 'react-bem-helper';

import { PositionButtons } from '../Positions/Positions';

const bem = bemHelper({ name: 'player-list' });

export default class PlayerList extends React.Component {

  static propTypes = {
    players: PropTypes.array
  };

  static defaultProps = {
    players: []
  };

  render() {
    const { players } = this.props;
    const { isSaving, position } = this.state;

    const Save = (isSaving)
      ? <em>Saving Players Positions...</em>
      : <button onClick={this.SavePlayerPositions} >Save Players Positions</button>;

    const filteredPlayers = players.filter((player) => player.pos === position);

    return (
      <div>
        { players.length ? Save : null }
        <ul { ...bem('list') }>
          {filteredPlayers
            .map((player) => {
              const update = this.state.playersToUpdate[player.fullName];
              const selectedPos = (!update && player.pos) || (update && update.pos);
              return (
                <li { ...bem('item') } id={player.code} key={player.code} >
                  {player.fullName}, {player.club}
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
