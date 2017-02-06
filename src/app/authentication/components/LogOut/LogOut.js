import React from 'react';

import Auth from '../../auth-helper';

const LogOutPage = React.createClass({
  componentDidMount() {
    Auth.logout();
  },

  render() {
    return <p>You are now logged out</p>;
  }
});

export default LogOutPage
