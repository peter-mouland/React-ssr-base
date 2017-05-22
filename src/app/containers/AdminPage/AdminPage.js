/* eslint-disable no-underscore-dangle, no-console */
import React from 'react';
import { connect } from 'react-redux';
import Route from 'react-router-dom/Route';

import AdminList from '../../components/Admin/AdminList';
import SeasonAdminOptions from '../../components/Admin/SeasonAdminOptions';
import LeagueAdminOptions from '../../components/Admin/LeagueAdminOptions';
import Auth from '../../authentication/auth-helper';
import { fetchSeasons, addSeason, addLeague } from '../../actions';

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

  addLeague = (id, name) => {
    this.props.addLeague(id, name);
  }

  render() {
    const { errors = [], loading, seasons, match } = this.props;
    const seasonPath = join(match.url, 'season/:id/');
    const leaguePath = join(seasonPath, 'league/:id/');

    if (errors.length) {
      return <Errors errors={errors} />;
    } else if (loading || !seasons) {
      return <Loading />;
    } else if (!Auth.isAdmin()) {
      return <p>You're not admin!</p>;
    }

    return (
      <section className="admin">
        <h3 className="sr-only">Admin Actions</h3>
        <AdminList list={ seasons } path="season" add={ this.addSeason } />
        <Route path={seasonPath} render={(seasonMatcher) => {
          const season = selectedItem(seasonMatcher.match, seasons);
          if (!season) return null;
          const leagues = season.leagues;

          return (
            <div>
              <SeasonAdminOptions season={season} />
              <AdminList list={ leagues } path="league" secondary add={ (name) => this.addLeague(season._id, name) } />
              <Route path={leaguePath} render={(leagueMatcher) => {
                const league = selectedItem(leagueMatcher.match, leagues);
                if (!league) return null;
                return <LeagueAdminOptions league={league} />;
              }}/>
              <AdminList list={ [{ name: 'teams', _id: 1 }] } path="team" secondary />
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
    loading: state.actionState.loading,
    errors: state.actionState.errors,
  };
}

export default connect(
  mapStateToProps,
  { fetchSeasons, addSeason, addLeague }
)(AdminPage);
