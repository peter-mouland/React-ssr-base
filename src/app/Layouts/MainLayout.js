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
          <span {...bem('nav', 'header')}>React SSR Base</span>
          <NamedLink to='homepage' {...bem('nav', 'link')} />
          <NamedLink to="game" {...bem('nav', 'link')} />
          <NamedLink to="dashboard" {...bem('nav', 'link')} />
          <MyAccount isUserAuthenticated={ isUserAuthenticated } />
        </nav>
        <main className="layout__content">
          {children}
        </main>
        <footer className="layout__footer">
          Hosted at <a href="http://github.com/peter-mouland/react-ssr-base">github.com/peter-mouland/react-srr-base</a>
        </footer>
      </div>
    );
  }
}
