/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import bemHelper from 'react-bem-helper';

import { availablePositions } from '../../components/Positions/Positions';

import './adminOptions.scss';

const bem = bemHelper({ name: 'player-stats' });

class PlayerAdminOptions extends React.Component {

  static propTypes = {
    players: PropTypes.array
  };

  static defaultProps = {
    players: []
  };

  constructor(props) {
    super(props);
    this.state = {
      isSaving: false,
      posFilter: '',
      clubFilter: '',
    };
    this.posFilter = this.posFilter.bind(this);
    this.clubFilter = this.clubFilter.bind(this);
  }

  posFilter(e) {
    this.setState({ posFilter: e.target.value });
  }

  clubFilter(e) {
    this.setState({ clubFilter: e.target.value });
  }

  render() {
    const { children, players, ...props } = this.props;
    const { posFilter, clubFilter } = this.state;
    const clubsObj = players.reduce((prev, curr) => { prev[curr.club] = true; return prev; }, {});
    const clubs = Object.keys(clubsObj).sort();

    return (
      <div className="admin-options" { ...props }>
        <div className="admin-option">

          <table cellPadding={0} cellSpacing={0} { ...bem('table') }>
            <thead>
            <tr { ...bem('data-header')}>
              <th>code</th>
              <th>position</th>
              <th>player</th>
              <th>club</th>
            </tr>
            <tr>
              <th></th>
              <th>
                <select onChange={this.posFilter}>
                  <option value={''}>all</option>
                  {availablePositions.map((pos) => <option value={pos} key={pos}>{pos}</option>)}
                </select>
              </th>
              <th></th>
              <th>
                <select onChange={this.clubFilter}>
                  <option value={''}>all</option>
                  {clubs.map((club) => <option value={club} key={club}>{club}</option>)}
                </select>
              </th>
            </tr>
            </thead>
            <tbody>
            {
              players
                .filter((player) => {
                  const isFiltered =
                    (!!posFilter && posFilter !== player.pos) ||
                    (!!clubFilter && clubFilter !== player.club);
                  return !isFiltered;
                })
                .map((player) => (
                  <tr key={player.code} { ...bem('player')}>
                    <td { ...bem('meta')} >{player.code}</td>
                    <td { ...bem('meta', player.pos)} >{player.pos}</td>
                    <td { ...bem('meta')} >{player.name}</td>
                    <td { ...bem('meta')} >{player.club}</td>
                  </tr>
                ))
            }
            </tbody>
          </table>

        </div>
        <div className="admin-option admin-option__btn">
          { children }
        </div>
      </div>
    );
  }
}

export default PlayerAdminOptions;
