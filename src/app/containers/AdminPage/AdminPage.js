/* eslint-disable no-underscore-dangle, no-console */
import React from 'react';
import { connect } from 'react-redux';
import Route from 'react-router-dom/Route';
// import Redirect from 'react-router-dom/Redirect';

import AdminList from '../../components/Admin/AdminList';
import AddUser from '../../components/Admin/AddUser';
import AdminForm from '../../components/Admin/AdminForm';
import SeasonAdminOptions from '../../components/Admin/SeasonAdminOptions';
import LeagueAdminOptions from '../../components/Admin/LeagueAdminOptions';
import ManagerAdminOptions from '../../components/Admin/ManagerAdminOptions';
import Auth from '../../authentication/auth-helper';
import {
  fetchSeasons, addSeason, addLeague, addUser, ADD_SEASON, ADD_LEAGUE, ADD_USER
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

const selectedItem = (match, items) => items.find((item) => item._id === match.params.id);

export const join = (prefix, postfix) => `${prefix}/${postfix}`.replace(/\/\/\//g, '/').replace(/\/\//g, '/');

class AdminPage extends React.Component {

  static needs = [fetchSeasons];

  componentDidMount() {
    if (this.props.seasons) return;
    this.props.fetchSeasons();
  }

  addSeason = (name) => {
    this.props.addSeason(name);
  }

  addLeague = (seasonId, name) => {
    this.props.addLeague(seasonId, name);
  }

  addUser = (seasonId, form) => {
    this.props.addUser(seasonId, form.leagueId, form.name, form.email);
  }

  render() {
    const { errors = [], loading, seasons, match, seasonAdded, leagueAdded } = this.props;

    const addingSeason = loading === ADD_SEASON;
    const addingLeague = loading === ADD_LEAGUE;
    const addingUser = loading === ADD_USER;
    const seasonPath = join(match.url, 'season/:id/');
    const leaguePath = join(seasonPath, 'league/:id/');
    const managersPath = join(seasonPath, 'managers');

    if (seasonAdded) {
      // return <Redirect to={ seasonPath.replace(':id', seasonAdded._id )} />
    } else if (leagueAdded) {
      // return <Redirect to={ leaguePath.replace(':id', leagueAdded._id )} />
    } else if (errors.length) {
      return <Errors errors={errors} />;
    } else if (!seasons) {
      return <Loading />;
    } else if (!Auth.isAdmin()) {
      return <p>You're not admin!</p>;
    }

    return (
      <section className="admin">
        <h3 className="sr-only">Admin Actions</h3>
        <AdminList list={ seasons }
                   path="season"
        >
          <AdminForm add={ this.addSeason }
                     type="Season"
                     loading={ addingSeason } />
        </AdminList>
        <Route path={seasonPath} render={(seasonMatcher) => {
          const season = selectedItem(seasonMatcher.match, seasons);
          if (!season) return null;
          const leagues = season.leagues;

          return (
            <div>
              <SeasonAdminOptions season={season} />
              <AdminList list={ leagues }
                         path="League"
                         secondary
              >
                <AdminForm add={ (name) => this.addLeague(season._id, name) }
                           type="league"
                           loading={ addingLeague } />
              </AdminList>
              <Route path={leaguePath} render={(leagueMatcher) => {
                const league = selectedItem(leagueMatcher.match, leagues);
                if (!league) return null;
                return (
                  <LeagueAdminOptions league={league}>
                    <AddUser add={ (form) => this.addUser(season._id, form) }
                             loading={ addingUser }
                             leagueId={ league._id }
                    />
                  </LeagueAdminOptions>
                );
              }}/>
              <AdminList list={ [{ name: 'Managers' }] }
                         path="managers"
                         secondary
              />
              <Route path={managersPath} render={(managersMatcher) => {
                if (!managersMatcher.match) return null;
                return <ManagerAdminOptions />;
              }}/>
            </div>
          );
        }}/>


        <ul>
          <li>Assign Manager to League</li>
          <li>Authorise Transfers</li>
          <li>Increment Game Week</li>
        </ul>
        <section className="admin__assign-to-league">
          <h4>Assign Manager to League</h4>
          <form method="post" name="admin-managers">
            <h5>League 1</h5>
            <select name="managers-league-1" multiple></select>
            <h5>League 2</h5>
            <select name="managers-league-2" multiple></select>
          </form>
        </section>
        <section className="admin__transfers">
          <h4>Authorise Transfers</h4>
        </section>
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
    // seasonAdded: state.seasons.seasonAdded,
    // leagueAdded: state.seasons.leagueAdded,
    loading: state.promiseState.loading,
    errors: state.promiseState.errors,
  };
}

export default connect(
  mapStateToProps,
  { fetchSeasons, addSeason, addLeague, addUser }
)(AdminPage);
