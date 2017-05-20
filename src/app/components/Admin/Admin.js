import React from 'react';

import Auth from '../../authentication/auth-helper';

import './admin.scss';

class Admin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newSeason: '',
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
      newSeason: e.currentTarget.value,
      isDuplicateSeason: this.props.seasons.find((season) => season === e.currentTarget.value)
    });
  }

  render() {
    if (!Auth.isAdmin()) return <p>No Access</p>;
    const { seasons, ...props } = this.props;
    const { newSeason, isDuplicateSeason } = this.state;

    return (
      <section {...props} className="admin">
        <h3>Admin Actions</h3>
        <form className="seasons" method="POST" onSubmit={this.addSeason}>
          <input className="seasons__input"
                 type="text"
                 name="season"
                 onChange={this.showPastSeasons}
          />
          <input className="seasons__add-button"
                 type="submit"
                 value="Add Season"
                 disabled={isDuplicateSeason}
          />
          <ul className="seasons__list">
            {
              seasons
                .filter((season) => season.season.includes(newSeason))
                .map((season, i) => <li className="seasons__item" key={i}>{season.season}</li>)
            }
          </ul>
        </form>

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
