/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

import { SubLink } from '../../../app/routes';

class SeasonsList extends React.Component {

  static propTypes = {
    seasons: PropTypes.array
  }

  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.addSeason = this.addSeason.bind(this);
  }

  addSeason(e) {
    e.preventDefault();
  }

  render() {
    const { seasons, ...props } = this.props;
    const { router: { route: { match } } } = this.context;

    return (
      <ul className="seasons__list" { ...props } >
        {
          seasons
            .map((season, i) => (
              <li className="seasons__item" key={i}>
                <SubLink to={`${match.path}season/${season._id}/`} className="seasons__text">
                  {season.season}
                </SubLink>
              </li>
            ))
        }
        <li className="seasons__item">
          <form method="POST" onSubmit={this.addSeason}>
            <input className="seasons__input seasons__text"
                   type="text"
                   name="season"
                   defaultValue={'new season'}
            />
            <input className="seasons__button"
                   type="submit"
                   value="Add"
            />
          </form>
        </li>
      </ul>
    );
  }
}

export default SeasonsList;
