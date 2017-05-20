/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

import Toggle from '../Toggle/Toggle';

import './adminOptions.scss';

class SeasonAdminOptions extends React.Component {

  static propTypes = {
    season: PropTypes.object,
  }

  render() {
    const { season, ...props } = this.props;

    return (
      <div className="admin-options" { ...props }>
        <Toggle checked={ season.isLive }
                id={`season-live--${season._id}`}
                className="admin-option"
        >
          Season is Live?
        </Toggle>
        <div className="admin-option">
          Game Week: <span className="admin-option__value">{season.currentGW}</span>
        </div>
        <div className="admin-option admin-option__btn">
          <button className="admin-btn">New Game Week</button>
        </div>
      </div>
    );
  }
}

export default SeasonAdminOptions;
