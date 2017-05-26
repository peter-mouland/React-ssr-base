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
      email: this.inputs.email.value
    });
  };

  render() {
    const { loading } = this.props;
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
          <input className="admin-btn" type="submit" value="Add New User"/>
        </form>

    );
  }
}

export default AddUser;
