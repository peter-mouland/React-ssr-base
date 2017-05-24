/* eslint-disable no-underscore-dangle, no-console */
import React from 'react';
import { connect } from 'react-redux';
import Route from 'react-router-dom/Route';

import AdminList from '../../components/Admin/AdminList';
import SeasonAdminOptions from '../../components/Admin/SeasonAdminOptions';
import LeagueAdminOptions from '../../components/Admin/LeagueAdminOptions';
import ManagerAdminOptions from '../../components/Admin/ManagerAdminOptions';
import Auth from '../../authentication/auth-helper';
import {
  fetchSeasons, addSeason, addLeague, addUserAndAssignToLeague, ADD_SEASON, ADD_LEAGUE, ADD_USER
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

  addUserAndAssignToLeague = (seasonId, form) => {
    this.props.addUserAndAssignToLeague(seasonId, form.leagueId, form.name, form.email);
  }

  render() {
    const { errors = [], loading, seasons, match } = this.props;
    const addingSeason = loading === ADD_SEASON;
    const addingLeague = loading === ADD_LEAGUE;
    const addingManager = loading === ADD_USER;
    const seasonPath = join(match.url, 'season/:id/');
    const leaguePath = join(seasonPath, 'league/:id/');
    const managersPath = join(seasonPath, 'managers');

    if (errors.length) {
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
                   add={ this.addSeason }
                   loading={ addingSeason }
        />
        <Route path={seasonPath} render={(seasonMatcher) => {
          const season = selectedItem(seasonMatcher.match, seasons);
          if (!season) return null;
          const leagues = season.leagues;

          return (
            <div>
              <SeasonAdminOptions season={season} />
              <AdminList list={ leagues }
                         path="league"
                         secondary
                         add={ (name) => this.addLeague(season._id, name) }
                         loading={ addingLeague }
              />
              <Route path={leaguePath} render={(leagueMatcher) => {
                const league = selectedItem(leagueMatcher.match, leagues);
                if (!league) return null;
                return <LeagueAdminOptions league={league} />;
              }}/>
              <AdminList list={ [{ name: 'Managers' }] }
                         path="managers"
                         secondary
              />
              <Route path={managersPath} render={(managersMatcher) => {
                if (!managersMatcher.match) return null;
                return <ManagerAdminOptions add={ (form) => this.addUserAndAssignToLeague(season._id, form) }
                                            loading={ addingManager }
                                            leagues={ leagues }
                        />;
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
    loading: state.promiseState.loading,
    errors: state.promiseState.errors,
  };
}

export default connect(
  mapStateToProps,
  { fetchSeasons, addSeason, addLeague, addUserAndAssignToLeague }
)(AdminPage);
