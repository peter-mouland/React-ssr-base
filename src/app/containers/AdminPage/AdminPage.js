/* eslint-disable no-underscore-dangle, no-console */
import React from 'react';
import { connect } from 'react-redux';
import Route from 'react-router-dom/Route';

import AdminList from '../../components/Admin/AdminList';
import AddUser from '../../components/Admin/AddUser';
import AdminForm from '../../components/Admin/AdminForm';
import SeasonAdminOptions from '../../components/Admin/SeasonAdminOptions';
import LeagueAdminOptions from '../../components/Admin/LeagueAdminOptions';
import ManagerAdminOptions from '../../components/Admin/ManagerAdminOptions';
import PlayerAdminOptions from '../../components/Admin/PlayerAdminOptions';
import Auth from '../../authentication/auth-helper';
import {
  fetchSeasons, fetchTeams, fetchPlayers, addSeason, addLeague, addUser, ADD_SEASON, ADD_LEAGUE, ADD_USER
} from '../../actions';

import './adminPage.scss';

const Error = ({ error }) => <div>
  <p>Error Loading seasons!</p>
  <p>{ error.message }</p>
</div>;

const Errors = ({ errors }) => <div>
  {errors.map((error, i) => <Error error={error} key={i} />)}
</div>;

const Loading = () => <p>Loading seasons....</p>;

const selectedItem = (match, items, key) => items.find((item) => item._id === match.params[key]);

export const join = (prefix, postfix) =>
  `${prefix}/${postfix}`.replace(/\/\/\//g, '/').replace(/\/\//g, '/');

class AdminPage extends React.Component {

  static needs = [fetchSeasons, fetchTeams];

  componentDidMount() {
    if (!this.props.seasons) {
      this.props.fetchSeasons();
    }
    if (!this.props.teams) {
      this.props.fetchTeams();
    }
    if (!this.props.players) {
      this.props.fetchPlayers();
    }
  }

  addSeason = (name) => {
    this.props.addSeason(name);
  }

  addLeague = (seasonId, name) => {
    this.props.addLeague(seasonId, name);
  }

  addUser = (seasonId, form) => {
    this.props.addUser(seasonId, form);
  }

  render() {
    const {
      errors = [], teamErrors = [], loading, seasons, players = [], teams = [], match
    } = this.props;
    const addingSeason = loading === ADD_SEASON;
    const addingLeague = loading === ADD_LEAGUE;
    const addingUser = loading === ADD_USER;
    const seasonPath = join(match.url, 'season/:seasonId/');
    const leaguePath = join(seasonPath, 'league/:leagueId/');
    const managersPath = join(seasonPath, 'managers');
    const playersPath = join(seasonPath, 'players');

    if (errors.length) {
      return <Errors errors={errors} />;
    } else if (teamErrors.length) {
      return <Errors errors={teamErrors} />;
    } else if (!seasons) {
      return <Loading />;
    } else if (!Auth.isAdmin()) {
      return <p>You're not admin!</p>;
    }

    return (
      <section className="admin">
        <div className="bg" />
        <h3 className="sr-only">Admin Actions</h3>
        <AdminList list={ seasons }
                   path="season"
        >
          <AdminForm add={ this.addSeason }
                     type="Season"
                     loading={ addingSeason } />
        </AdminList>
        <Route path={seasonPath} render={(seasonRoute) => {
          const season = selectedItem(seasonRoute.match, seasons, 'seasonId');
          if (!season) return null;
          const leagues = season.leagues;

          return (
            <div>
              <SeasonAdminOptions season={season} >
                <p>compare ff players to Sky Sports players</p>
              </SeasonAdminOptions>
              <AdminList list={ leagues }
                         path="league"
                         secondary
              >
                <AdminForm add={ (name) => this.addLeague(season._id, name) }
                           type="league"
                           loading={ addingLeague } />
              </AdminList>
              <Route path={leaguePath} render={(leagueMatcher) => {
                const league = selectedItem(leagueMatcher.match, leagues, 'leagueId');
                if (!league) return null;
                const leagueTeams = teams.filter((team) => team.league.id === league._id);
                return (
                  <LeagueAdminOptions league={league} teams={ leagueTeams }>
                    {/* assign user to league */}
                  </LeagueAdminOptions>
                );
              }}/>
              <AdminList list={ [{ name: 'Managers' }] }
                         path="managers"
                         secondary
              />
              <Route path={managersPath} render={(managersMatcher) => {
                if (!managersMatcher.match) return null;
                return (
                  <ManagerAdminOptions teams={ teams }>
                    <AddUser add={(form) => this.addUser(season._id, form)}
                             loading={ addingUser }
                             leagues={ leagues }
                    />
                  </ManagerAdminOptions>
                );
              }}/>
              <AdminList list={ [{ name: 'Players' }] }
                         path="players"
                         secondary
              />
              <Route path={playersPath} render={(playersMatcher) => {
                if (!playersMatcher.match) return null;
                return (
                  <PlayerAdminOptions players={ players } />
                );
              }}/>
            </div>
          );
        }}/>

        <h3>Todo:</h3>
        <ul>
          <li>Authorise Transfers</li>
          <li>Increment Game Week</li>
        </ul>
        <section className="admin__game-week">
          <h4>Increment Game Week</h4>
          <p>Incrementing game week will save the current scores.</p>
          <p>This can only be done if there are NO outstanding transfers.</p>
          <p>Current Game Week: 32</p>
        </section>

      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    seasons: state.seasons.data,
    teams: state.teams.data,
    players: state.players.data,
    teamErrors: state.teams.errors,
    seasonAdded: state.seasons.seasonAdded,
    leagueAdded: state.seasons.leagueAdded,
    loading: state.promiseState.loading,
    errors: state.promiseState.errors,
  };
}

export default connect(
  mapStateToProps,
  { fetchSeasons, fetchTeams, fetchPlayers, addSeason, addLeague, addUser }
)(AdminPage);
