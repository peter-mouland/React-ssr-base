/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import bemHelper from 'react-bem-helper';

const bem = bemHelper({ name: 'admin-list' });

class AddUser extends React.Component {

  static propTypes = {
    loading: PropTypes.bool,
  }

  inputs = {};

  add = (e) => {
    e.preventDefault();
    this.props.add({
      name: this.inputs.name.value,
      email: this.inputs.email.value,
      leagueId: this.inputs.league.value
    });
  };

  render() {
    const { loading, leagues = [] } = this.props;
    return (loading ?
        <div { ...bem('text', 'saving') }>Saving...</div> :
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
            <label htmlFor="user-league" required>Assign to League:</label>
            <select id="user-league"
                   name="user-league"
                   ref={(input) => { this.inputs.league = input; }}
            >
              {leagues.map((league) =>
                <option key={league._id} value={league._id}>{league.name}</option>
              )}
            </select>
          </div>
          <input className="admin-btn" type="submit" value="Add New User"/>
        </form>

    );
  }
}

export default AddUser;
