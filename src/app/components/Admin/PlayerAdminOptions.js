/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import bemHelper from 'react-bem-helper';

import { availablePositions } from '../../components/Positions/Positions';

import './adminOptions.scss';

const bem = bemHelper({ name: 'player-stats' });

const Selector = ({ onChange, defaultValue, options }) => (
  <select onChange={onChange} defaultValue={defaultValue}>
    <option value={''}>all</option>
    {options.map((item) => (
      <option value={ item } key={ item }>{ item }</option>
    ))}
  </select>
);

const Highlight = ({ player, update, detail }) => update[detail]
  ? <em className="text--warning">{update[detail]}</em>
  : <span>{player[detail]}</span>;

const DraftUpdates = ({ players, updates, save }) => {
  return <div className="updates">
    {(Object.keys(updates)).map(id => {
      const update = updates[id];
      const player = players.find(player => player._id === id);
      return (
        <div>
          Update {player.name}:
          <ul>
            {(Object.keys(update))
              .filter(detail => ['pos','club','name'].includes(detail))
              .map(detail => (
                <li>{player[detail]} to {update[detail]}</li>
              ))
            }
          </ul>
        </div>
      )}
    )}
    <button onClick={save}>Save Updates</button>
  </div>
};

class PlayerAdminOptions extends React.Component {

  static propTypes = {
    players: PropTypes.array
  };

  static defaultProps = {
    players: []
  };

  clubs = [];

  constructor(props) {
    super(props);
    this.posFilter = this.posFilter.bind(this);
    this.clubFilter = this.clubFilter.bind(this);
    this.setClubs(props);
    this.state = {
      isSaving: false,
      posFilter: '',
      clubFilter: this.clubs[0],
      playersToUpdate: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setClubs(nextProps);
  }

  saveToState(e, player, detail) {
    const existingPlayerUpdate = this.state.playersToUpdate[player._id];
    const playersToUpdate = {
      ...this.state.playersToUpdate,
      [player._id]: {
        ...existingPlayerUpdate,
        [detail]: e.currentTarget.value
      }
    };
    this.setState({ playersToUpdate });
  }

  posFilter(e) {
    this.setState({ posFilter: e.target.value });
  }

  clubFilter(e) {
    this.setState({ clubFilter: e.target.value });
  }

  setClubs(props) {
    this.clubs = (props.players.length) ? this.getClubs(props.players) : [];
  }

  getClubs(players) {
    const clubs = new Set();
    players.forEach((player) => clubs.add(player.club));
    return [...clubs.keys()].sort();
  }

  showUpdater(e, player, detail) {
    const reset = {
      showPosUpdater: null,
      showNameUpdater: null,
      showClubUpdater: null
    };
    this.setState({
      ...reset,
      [`show${detail}Updater`]: player._id
    });
  }

  render() {
    const { children, players, ...props } = this.props;
    const { posFilter, clubFilter, playersToUpdate } = this.state;
    const clubs = this.clubs;
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
                <Selector onChange={ this.posFilter }
                          defaultValue={ posFilter }
                          options={ availablePositions }
                />
              </th>
              <th></th>
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
                    (!!posFilter && posFilter !== player.pos) ||
                    (!!clubFilter && clubFilter !== player.club);
                  return !isFiltered;
                })
                .map((player, i) => {
                  const update = playersToUpdate[player._id] || {};
                  const pos = update.pos || player.pos;
                  const name = update.name || player.name;
                  const club = update.club || player.club;

                  return (
                    <tr key={player.code} { ...bem('player')}>
                      <td { ...bem('meta')}>{player.code}</td>
                      <td { ...bem('meta', player.pos)}
                          onMouseOver={ (e) => this.showUpdater(e, player, 'Pos') }
                      >
                        {
                          this.state.showPosUpdater === player._id
                          ? <Selector onChange={ (e) => this.saveToState(e, player, 'pos') }
                                      defaultValue={ pos }
                                      options={ availablePositions } />
                          : <Highlight player={ player } update={ update } detail="pos"/>
                        }
                      </td>
                      <td { ...bem('meta')}
                          onMouseOver={ (e) => this.showUpdater(e, player, 'Name') }
                      >
                        {
                          this.state.showNameUpdater === player._id
                            ? <input type="text"
                                     onChange={ (e) => this.saveToState(e, player, 'name') }
                                     defaultValue={ name } />
                            : <Highlight player={ player } update={ update } detail="name"/>
                        }
                      </td>
                      <td { ...bem('meta')}
                          onMouseOver={ (e) => this.showUpdater(e, player, 'Club') }
                      >
                        {
                          this.state.showClubUpdater === player._id
                            ? <Selector onChange={ (e) => this.saveToState(e, player, 'club') }
                                        defaultValue={ club }
                                        options={ this.clubs } />
                            : <Highlight player={ player } update={ update } detail="club"/>
                        }
                      </td>
                      <td { ...bem('action')} ></td>
                    </tr>
                  );
                })
            }
            </tbody>
          </table>

        </div>
        <div className="admin-option">
          <h2>Draft Updates</h2>
          { players && (Object.keys(playersToUpdate)).length > 0
            ? <DraftUpdates updates={ playersToUpdate } players={ players } saveUpates={()=>{}} />
            : <em>none</em>
          }
        </div>
        <div className="admin-option admin-option__btn">
          { children }
        </div>
      </div>
    );
  }
}

export default PlayerAdminOptions;
