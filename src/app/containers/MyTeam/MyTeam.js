import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debug from 'debug';
import bemHelper from 'react-bem-helper';

import PlayerTable from '../../components/PlayerTable/PlayerTable';
import Svg from '../../components/Svg/Svg';
import field from '../../../assets/field.svg';
import {
  fetchTeams, fetchPlayers, updateTeam,
} from '../../actions';

import './my-team.scss';

const bem = bemHelper({ name: 'my-team' });
debug('base:myteam');

const Error = ({ error }) => <div>
  <p>Error Loading seasons!</p>
  <p>{ error.message }</p>
</div>;

const Errors = ({ errors }) => <div>
  {errors.map((error, i) => <Error error={error} key={i} />)}
</div>;

const Loading = () => <p>Loading seasons....</p>;

class MyTeam extends React.Component {

  static propTypes = {
    teams: PropTypes.array,
    players: PropTypes.array,
  };

  static defaultProps = {
    players: [],
    teams: [],
    loading: false,
    errors: []
  };

  constructor(props) {
    super(props);
    this.state = {
      isSaving: false,
      selectedPosition: '',
      selectedLeftOrRight: '',
      team: {},
    };
  }

  componentDidMount() {
    if (!this.props.teams.length) {
      this.props.fetchTeams();
    }
    if (!this.props.players.length) {
      this.props.fetchPlayers();
    }
  }

  selectPlayer = (player) => {
    this.setState({
      team: {
        ...this.state.team,
        [this.state.selectedPosition + this.state.selectedLeftOrRight]: player
      }
    });
  }

  saveTeam = () => {
    this.props.updateTeam(this.state.team);
  }

  choosePos = (pos, leftOrRight = '') => {
    this.setState({
      selectedPosition: pos,
      selectedLeftOrRight: leftOrRight
    });
  };

  squadPlayer = (pos, leftOrRight = '') => {
    const { team, selectedPosition, selectedLeftOrRight } = this.state;
    const player = team[pos + leftOrRight];
    const isSelected = selectedPosition === pos && selectedLeftOrRight === leftOrRight;
    return (
      <li { ...bem('position', pos, { 'text--warning': isSelected }) } onClick={ () => this.choosePos(pos, leftOrRight)}>
        <div className="position">
          <div className="position__label">{pos}</div>
          <div className="position__player">{player && player.name}</div>
        </div>
      </li>
    );
  }

  render() {
    const { players, loading, errors } = this.props;
    const { selectedPosition } = this.state;

    if (errors.length) {
      return <Errors errors={errors} />;
    } else if (loading) {
      return <Loading />;
    }

    return (
      <div { ...bem() } id="my-team">
        <h1>My Team</h1>
        <div { ...bem('panels') } >
          <section { ...bem('formation') }>
            <Svg { ...bem('field') } markup={field} />
            <ul { ...bem('squad') }>
              {this.squadPlayer('gk')}
              {this.squadPlayer('fb', 'left')}
              {this.squadPlayer('cb', 'left')}
              {this.squadPlayer('cb', 'right')}
              {this.squadPlayer('fb', 'right')}
              {this.squadPlayer('wm', 'left')}
              {this.squadPlayer('cm', 'left')}
              {this.squadPlayer('cm', 'right')}
              {this.squadPlayer('wm', 'right')}
              {this.squadPlayer('str', 'left')}
              {this.squadPlayer('str', 'right')}
              {this.squadPlayer('sub')}
            </ul>
            <button onClick={ this.saveTeam }>Save Team</button>
          </section>
          <section { ...bem('player-selection') }>
            <PlayerTable players={ players }
                         type="my-team"
                         selectedPosition={ selectedPosition }
                         selectPlayer={ this.selectPlayer }
            />
          </section>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    teams: state.teams.data,
    players: state.players.data,
    loading: state.promiseState.loading,
    errors: state.promiseState.errors,
  };
}

export default connect(
  mapStateToProps,
  { fetchTeams, fetchPlayers, updateTeam }
)(MyTeam);
