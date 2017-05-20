/* eslint-disable no-underscore-dangle */
import React from 'react';
import Link from 'react-router-dom/Link';

import './admin.scss';

class Admin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isDuplicateSeason: false
    };
    this.showPastSeasons = this.showPastSeasons.bind(this);
    this.addSeason = this.addSeason.bind(this);
  }

  addSeason(e) {
    e.preventDefault();
  }

  showPastSeasons(e) {
    this.setState({
      isDuplicateSeason: this.props.seasons.find((season) => season === e.currentTarget.value)
    });
  }

  render() {
    const { seasons, ...props } = this.props;
    const { isDuplicateSeason } = this.state;

    return (
      <section {...props} className="admin">
        <h3 className="sr-only">Admin Actions</h3>
        <section className="seasons">
          <ul className="seasons__list">
            {
              seasons
                .map((season, i) => (
                  <li className="seasons__item" key={i}>
                    <Link to={`/admin/season/${season._id}`}
                          className="seasons__text"
                    >
                      {season.season}
                    </Link>
                  </li>
                ))
            }
            <li className="seasons__item">
              <form method="POST" onSubmit={this.addSeason}>
                <input className="seasons__input seasons__text"
                       type="text"
                       name="season"
                       defaultValue={'new season'}
                       onChange={this.showPastSeasons}
                />
                <input className="seasons__add-button"
                       type="submit"
                       value="Add"
                       disabled={isDuplicateSeason}
                />
              </form>
            </li>
          </ul>
        </section>
        <ul>
          <li>Create/Edit Season</li>
          <li>Create/Edit League</li>
          <li>Assign Manager to League</li>
          <li>Authorise Transfers</li>
          <li>Increment Game Week</li>
        </ul>
        <section className="admin__season">
          <h4>Seasons</h4>
          <form method="post" name="admin-season">
            <input type="text" name="new-season" /> +
          </form>
        </section>
        <section className="admin__league">
          <h4>Create/Edit League</h4>
          <form method="post" name="admin-league">
            <input type="text" name="new-league" /> +
          </form>
        </section>
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
