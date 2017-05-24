/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

import './adminOptions.scss';

class ManagerAdminOptions extends React.Component {

  static propTypes = {
    loading: PropTypes.bool,
  }

  inputs = {};

  add = (e) => {
    e.preventDefault();
    this.props.add({
      name: this.inputs.name.value,
      email: this.inputs.email.value,
      leagueId: this.inputs.leagueId.value,
    });
  };

  render() {
    const { leagues, add, loading, ...props } = this.props;

    return (
      <div className="admin-options" { ...props }>
        <div className="admin-option">
          Managers :
        </div>

        <div className="admin-option">
          League:
        </div>

        <div className="admin-option admin-option__btn">
          <form method="post" onSubmit={ this.add }>
            <div>
              <label htmlFor="user-name" required>Name:</label>
              <input id="user-name"
                     name="user-name"
                     ref={(input) => { this.inputs.name = input; }}
              />
            </div>
            <div>
              <label htmlFor="user-email" required>Email:</label>
              <input id="user-email"
                     name="user-email"
                     ref={(input) => { this.inputs.email = input; }}
              />
            </div>
            <div>
              <label htmlFor="user-league">League:</label>
              <select id="user-league"
                      name="user-league"
                      ref={(input) => { this.inputs.leagueId = input; }}
              >
                <option value="" />
                {leagues.map((league) => (
                  <option value={ league._id } key={ league._id }>{ league.name }</option>
                ))}
              </select>
            </div>

            <input className="admin-btn" type="submit" value="Add Manager"/>
          </form>
        </div>
      </div>
    );
  }
}

export default ManagerAdminOptions;
