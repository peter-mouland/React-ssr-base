import React from 'react';
import PropTypes from 'prop-types';
import debug from 'debug';
import bemHelper from 'react-bem-helper';

import './playerTable.scss';

import { availablePositions } from '../../components/Positions/Positions';

const bem = bemHelper({ name: 'player-table' });
debug('base:myteam');

const Selector = ({ onChange, defaultValue, options }) => (
  <select onChange={onChange} defaultValue={defaultValue}>
    <option value={''}>all</option>
    {options.map((item) => (
      <option value={ item } key={ item }>{ item }</option>
    ))}
  </select>
);

export default class PlayerTable extends React.Component {

  static propTypes = {
    players: PropTypes.array,
    type: PropTypes.string,
    selectedPosition: PropTypes.string
  };

  static defaultProps = {
    players: [],
    selectedPosition: ''
  };

  clubs = [];

  constructor(props) {
    super(props);
    this.setClubs(props);
    this.state = {
      isSaving: false,
      nameFilter: '',
      posFilter: props.selectedPosition,
      clubFilter: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setClubs(nextProps);
    if (nextProps.selectedPosition !== this.state.selectedPosition) {
      this.setState({ posFilter: nextProps.selectedPosition });
    }
  }

  posFilter = (e) => {
    this.setState({ posFilter: e.target.value });
  }

  clubFilter = (e) => {
    this.setState({ clubFilter: e.target.value });
  }

  nameFilter = (e) => {
    this.setState({ nameFilter: e.target.value.toLowerCase().trim() });
  }

  setClubs = (props) => {
    this.clubs = (props.players.length) ? this.getClubs(props.players) : [];
  }

  getClubs = (players) => {
    const clubs = new Set();
    players.forEach((player) => clubs.add(player.club));
    return [...clubs.keys()].sort();
  }

  render() {
    const { players, type, className, selectPlayer, selectedPosition } = this.props;
    const { posFilter, clubFilter, nameFilter } = this.state;
    const clubs = this.clubs;

    return (
      <table cellPadding={0} cellSpacing={0} { ...bem(null, type, className) }>
        <thead>
        <tr { ...bem('data-header')}>
          <th>position</th>
          <th>player</th>
          <th>club</th>
          <th>point</th>
        </tr>
        <tr {...bem('data-filter')}>
          <th>
            <Selector onChange={ this.posFilter }
                      defaultValue={ posFilter }
                      options={ availablePositions }
            />
          </th>
          <th><input type="search" onChange={ this.nameFilter } defaultValue="" /></th>
          <th>
            <Selector onChange={ this.clubFilter }
                      defaultValue={ clubFilter }
                      options={ clubs }
            />
          </th>
        </tr>
        </thead>
        <tbody>
        {
          players
            .filter((player) => {
              const isFiltered =
                (!!nameFilter && !player.name.toLowerCase().includes(nameFilter)) ||
                (!!posFilter && posFilter.toUpperCase() !== player.pos.toUpperCase()) ||
                (!!clubFilter && clubFilter.toUpperCase() !== player.club.toUpperCase());
              return !isFiltered;
            })
            .map((player) => (
                <tr key={player.code} { ...bem('player')}>
                  <td { ...bem('meta')} >{ player.pos }</td>
                  <td { ...bem('meta')} >{ player.name }</td>
                  <td { ...bem('meta')} >{ player.club }</td>
                  <td { ...bem('meta')} >
                    <button onClick={ () => selectPlayer(player) } disabled={ !selectedPosition }>
                      Select
                    </button>
                  </td>
                </tr>
              ))
        }
        </tbody>
      </table>
    );
  }
}
