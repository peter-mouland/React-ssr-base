/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import Route from 'react-router-dom/Route';

import AdminList from './AdminList';
import SeasonAdminOptions from './SeasonAdminOptions';
import LeagueAdminOptions from './LeagueAdminOptions';

import './admin.scss';

const selectedItem = (match, items) => items.find((item) => item._id === match.params.id);

export const join = (prefix, postfix) => `${prefix}/${postfix}`.replace(/\/\/\//g, '/').replace(/\/\//g, '/');

class Admin extends React.Component {

  static propTypes = {
    seasons: PropTypes.array,
  }

  static contextTypes = {
    router: PropTypes.object
  }

  render() {
    const { seasons, ...props } = this.props;
    const { router: { route: { match } } } = this.context;
    const seasonPath = join(match.url, 'season/:id/');
    const leaguePath = join(seasonPath, 'league/:id/');

    return (
      <section {...props} className="admin">
        <h3 className="sr-only">Admin Actions</h3>
        <AdminList list={ seasons } path="season" />
        <Route path={seasonPath} render={(seasonMatcher) => {
          const season = selectedItem(seasonMatcher.match, seasons);
          if (!season) return null;
          const leagues = season.leagues;
          return (
            <div>
              <SeasonAdminOptions season={season} />
              <AdminList list={ season.leagues } path="league" />
              <Route path={leaguePath} render={(leagueMatcher) => {
                const league = selectedItem(leagueMatcher.match, leagues);
                if (!league) return null;
                return <LeagueAdminOptions league={league} />;
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

export default Admin;
