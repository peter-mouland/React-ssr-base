/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

import Toggle from '../Toggle/Toggle';

import './adminOptions.scss';

class LeagueAdminOptions extends React.Component {

  static propTypes = {
    league: PropTypes.object,
  }

  render() {
    const { league, ...props } = this.props;

    return (
      <div className="admin-options" { ...props }>
        <Toggle checked={ league.isLive }
                id={`league-live--${league._id}`}
                className="admin-option"
        >
          League is Live?
        </Toggle>
        <div className="admin-option">
          Tier: <span className="admin-option__value">{league.tier}</span>
        </div>
        <div className="admin-option admin-option__btn">
          <button className="admin-btn">New League</button>
        </div>
      </div>
    );
  }
}

export default LeagueAdminOptions;
