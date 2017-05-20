/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import Route from 'react-router-dom/Route';

import Toggle from '../Toggle/Toggle';
import SeasonsList from './SeasonsList';

import './adminSeasons.scss';

const selectedSeason = (match, seasons) =>
  seasons.find((season) => season._id === match.params.id);

class AdminSeasons extends React.Component {

  static propTypes = {
    seasons: PropTypes.array
  }

  static contextTypes = {
    router: PropTypes.object
  }

  render() {
    const { seasons, ...props } = this.props;
    const { router: { route: { match } } } = this.context;

    return (
        <section className="seasons" { ...props } >
          <SeasonsList seasons={ seasons } />
          <Route path={`${match.path}season/:id/`} render={(matchProps) => {
            const season = selectedSeason(matchProps.match, seasons);
            return season ? (
              <div className="seasons__options">
                <Toggle checked={ season.isLive }
                        id={`season-live--${season._id}`}
                        className="seasons__option"
                >
                  Season is Live?
                </Toggle>
                <div className="seasons__option">
                  Game Week: <span className="seasons__value">{season.currentGW}</span>
                </div>
                <div className="seasons__option seasons__option--admin">
                  <button className="seasons__button">New Game Week</button>
                </div>
              </div>
            ) : null;
          }}/>
        </section>
    );
  }
}

export default AdminSeasons;
