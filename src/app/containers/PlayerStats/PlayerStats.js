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
const MAX_GW  = 35;
const GAME_WEEKS = Array.apply(null, Array(MAX_GW)).map(Number.prototype.valueOf,0);


const Error = ({ error }) => <div>
  <p>Error Loading players!</p>
  <p>{ error.message }</p>
</div>;

const Errors = ({ errors }) => <div>
  {errors.map((error, i) => <Error error={error} key={i} />)}
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
    this.state = {
      isSaving: false,
      posFilter: '',
      clubFilter: '',
      gw: 0
    };
    this.posFilter = this.posFilter.bind(this);
    this.clubFilter = this.clubFilter.bind(this);
    this.showGW = this.showGW.bind(this);
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

  showGW(e) {
    this.setState({ gw: e.target.value });
  }

  render() {
    const { players, errors = [], loading } = this.props;
    const { posFilter, clubFilter, gw } = this.state;
    const clubsObj = players.reduce((prev, curr) => { prev[curr.club] = true; return prev; }, {});
    const clubs = Object.keys(clubsObj).sort();


    if (errors.length) {
      return <Errors errors={errors} />;
    } else if (loading || !players.length) {
      return <Loading />;
    }

    return (
      <div { ...bem() }>
        <h2>Players Stats</h2>
        <table cellPadding={0} cellSpacing={0} { ...bem('table') }>
          <thead>
          <tr { ...bem('data-header')}>
            <th>code</th>
            <th>position</th>
            <th>player</th>
            <th>club</th>
            <th>total</th>
            {Object.keys(players[0].stats).map((key, i) => (
              <th key={i}>{key}</th>
            ))}
            <th>GW</th>
            <th></th>
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
            <th></th>
            {Object.keys(players[0].stats).map((key, i) => (
              <th key={i}></th>
            ))}
            <th>
              <select onChange={this.showGW}>
                {GAME_WEEKS.map((i, gw) => <option value={gw} key={gw}>{gw}</option>)}
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
                  <td { ...bem('meta')} >{player.player}</td>
                  <td { ...bem('meta')} >{player.club}</td>
                  <td { ...bem('meta')} >{player.total}</td>
                  {Object.keys(player.stats).map((key, i) => (
                    <td key={i} { ...bem('meta', 'stat')} >{player.stats[key]}</td>
                  ))}
                  <td>{
                    gw && gw > 0
                      ? player.points[`gw${gw}`] - player.points[`gw${gw - 1}`]
                      : ''
                  }</td>
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

