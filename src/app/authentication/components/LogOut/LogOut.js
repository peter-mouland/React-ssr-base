import React from 'react';

import Auth from '../../auth-helper';

class LogOutPage extends React.Component {
  componentDidMount() {
    Auth.logout();
  }

  render() {
    return (
      <section id="logout-page">
        <p className="message message--success">You are now logged out</p>
      </section>
    );
  }
}

export default LogOutPage;
