import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import bemHelper from 'react-bem-helper';
import debug from 'debug';

import { availablePositions } from '../../components/Positions/Positions';
import { fetchPlayers } from '../../actions';
import './playerStats.scss';

const log = debug('footy:Homepage.js'); //eslint-disable-line
const bem = bemHelper({ name: 'player-stats' });

const Error = ({ error }) => <div>
  <p>Error Loading cards!</p>
  <p>{ error.message }</p>
</div>;

const Loading = () => <p>Loading players....</p>;

class PlayerStats extends React.Component {

  static needs = [fetchPlayers];

  static propTypes = {
    players: PropTypes.array
  };

  static defaultProps = {
    players: []
  };

  constructor(props) {
    super(props);
    this.saveStatsSnapshot = this.saveStatsSnapshot.bind(this);
    this.posFilter = this.posFilter.bind(this);
    this.clubFilter = this.clubFilter.bind(this);
    this.state = {
      isSaving: false,
      posFilter: '',
      clubFilter: ''
    };
  }

  componentDidMount() {
    if (this.props.players.length > 0) return;
    this.props.fetchPlayers();
  }

  posFilter(e) {
    this.setState({ posFilter: e.target.value });
  }

  clubFilter(e) {
    this.setState({ clubFilter: e.target.value });
  }

  saveStatsSnapshot() {
    this.props.saveStatsSnapshot(this.props.players)
  }

  render() {
    const { players, errors=[], loading } = this.props;
    const { isSaving, posFilter, clubFilter } = this.state;
    const Save = (isSaving)
      ? <em>Saving ALL stats to Google... this may take a minute or two.</em>
      : <button onClick={this.saveStatsSnapshot} >Save Stats-Snapshot</button>;

    const clubsObj = {};
    players.forEach(player => { clubsObj[player.club] = true; });
    const clubs = Object.keys(clubsObj).sort();

    return (
      <div { ...bem() }>
        <h2>Players Stats</h2>
        <section>
          { loading && <Loading /> }
          { errors.map((error) => <Error error={error} />) }
        </section>
        {Save}
        <table cellPadding={0} cellSpacing={0} { ...bem('table') }>
          <thead>
          <tr { ...bem('data-header')}>
            <th>code</th>
            <th>position</th>
            <th>player</th>
            <th>club</th>
            {Object.keys(players[0].stats).map((key, i) => (
              <th key={i}>{key}</th>
            ))}
          </tr>
          <tr>
            <th></th>
            <th>
              <select onChange={this.posFilter}>
                <option value={''}>all</option>
                {availablePositions.map(pos => <option value={pos} key={pos}>{pos}</option>)}
              </select>
            </th>
            <th></th>
            <th>
              <select onChange={this.clubFilter}>
                <option value={''}>all</option>
                {clubs.map(club => <option value={club} key={club}>{club}</option>)}
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
        {
          players
            .filter(player => {
              const isFiltered = (!!posFilter && posFilter !== player.pos)
                || (!!clubFilter && clubFilter !== player.club);
              return !isFiltered;
            })
            .map(player => (
              <tr key={player.code} { ...bem('player')}>
                  <td { ...bem('meta')} >{player.code}</td>
                  <td { ...bem('meta', player.pos)} >{player.pos}</td>
                  <td { ...bem('meta')} >{player.player}</td>
                  <td { ...bem('meta')} >{player.club}</td>
                  {Object.keys(player.stats).map((key, i) => (
                    <td key={i} { ...bem('meta', 'stat')} >{player.stats[key]}</td>
                  ))}
                </tr>
            ))
        }
        </tbody>
      </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.actionState.errors,
    loading: state.actionState.loading,
    players: state.players.data
  };
}

export default connect(
  mapStateToProps,
  { fetchPlayers }
)(PlayerStats);

