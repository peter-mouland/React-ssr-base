/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

import './adminOptions.scss';

class LeagueAdminOptions extends React.Component {

  static propTypes = {
    league: PropTypes.object,
  }

  render() {
    const { league, ...props } = this.props;

    return (
      <div className="admin-options admin-options--top" { ...props }>
        <div className="admin-option">
          Tier: <span className="admin-option__value">{league.tier}</span>
        </div>
        <div className="admin-option">
          <h3>Current Players</h3>
          <ul>
            <li>Naked</li>
            <li>Johnny</li>
            <li>Jazza</li>
          </ul>
        </div>
        <div className="admin-option">
          <h3>Available Players</h3>
          <ul>
            <li>Nick</li>
            <li>Olly</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default LeagueAdminOptions;
