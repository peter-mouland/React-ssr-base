import React from 'react';
import bemHelper from 'react-bem-helper';
import debug from 'debug';

import Auth from '../authentication/auth-helper';
import { NamedLink } from '../routes';
import './mainLayout.scss';

const log = debug('base:mainLayout');

class MyAccount extends React.Component {

  render() {
    const bem = bemHelper({ name: 'my-account' });
    const { className, isUserAuthenticated, ...props } = this.props;
    const loggedOut = (
      <span>
        <NamedLink to="login" />
      </span>
    );
    const loggedIn = <NamedLink to="logout" />;
    return (
      <div {...bem(null, null, className)} { ...props } >
        { isUserAuthenticated
          ? loggedIn
          : loggedOut
        }
      </div>
    );
  }
}

export default class MainLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isUserAuthenticated: Auth.validateToken()
    };
    this.updateAuth = this.updateAuth.bind(this);
  }

  updateAuth(isUserAuthenticated) {
    this.setState({ isUserAuthenticated });
  }

  componentWillMount() {
    Auth.onChange = this.updateAuth;
  }

  render() {
    const bem = bemHelper({ name: 'layout' });
    const { children } = this.props;
    const { isUserAuthenticated } = this.state;

    return (
      <div {...bem(null, 'main')}>
        <nav {...bem('nav')}>
          <span {...bem('nav', 'header')}>FF</span>
          <NamedLink to="myTeam" {...bem('nav', 'link')} />
          <NamedLink to="playerStats" {...bem('nav', 'link')} />
          <NamedLink to="dashboard" {...bem('nav', 'link')} />
          { Auth.isAdmin() ? <NamedLink to="admin" {...bem('nav', 'link')} /> : null }
          <MyAccount isUserAuthenticated={ isUserAuthenticated } />
        </nav>
        <main {...bem('content')}>
          {children}
        </main>
        <footer {...bem('footer')}>
          Hosted at <a href="http://github.com/peter-mouland/react-ssr-base">github.com/peter-mouland/react-srr-base</a>
        </footer>
      </div>
    );
  }
}
