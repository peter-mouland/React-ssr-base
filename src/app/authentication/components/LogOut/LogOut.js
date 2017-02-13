import React from 'react';

import Auth from '../../auth-helper';

class LogOutPage extends React.Component {
  componentDidMount() {
    Auth.logout();
  }

  render() {
    return <p>You are now logged out</p>;
  }
}

export default LogOutPage;
