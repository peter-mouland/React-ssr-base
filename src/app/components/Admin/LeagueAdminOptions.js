/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

import './adminOptions.scss';

class LeagueAdminOptions extends React.Component {

  static propTypes = {
    league: PropTypes.object,
  }

  render() {
    const { league, teams, children, ...props } = this.props;

    return (
      <div className="admin-options admin-options--top" { ...props }>
        <div className="admin-option">
          Tier: <span className="admin-option__value">{league.tier}</span>
        </div>
        <div className="admin-option">
          <ul className="simple-list">
            { teams.map((team) => <li key={team._id}>{team.name}<span className="user">{team.user.name}</span></li>) }
          </ul>
        </div>
        <div className="admin-option admin-option__btn">
          { children }
        </div>
      </div>
    );
  }
}

export default LeagueAdminOptions;
