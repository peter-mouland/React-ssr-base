import React from 'react';
import bemHelper from 'react-bem-helper';
import debug from 'debug';

import Auth from '../authentication/auth-helper';
import { NamedLink } from '../routes';
import './mainLayout.scss';

const bem = bemHelper('my-account');
const log = debug('lego:mainLayout');

class MyAccount extends React.Component {

  render() {
    const { navLinkProps, className, isUserAuthenticated, ...props } = this.props;
    const loggedOut = (
      <span>
        <NamedLink to="login" { ...navLinkProps } />
        <NamedLink to="signup" { ...navLinkProps } />
      </span>
    );
    const loggedIn = <NamedLink to="logout" { ...navLinkProps } />;
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
      isUserAuthenticated: Auth.isUserAuthenticated()
    };
    log('setState', { isUserAuthenticated: this.state.isUserAuthenticated });
    this.updateAuth = this.updateAuth.bind(this);
  }

  updateAuth(isUserAuthenticated) {
    this.setState({ isUserAuthenticated });
  }

  componentWillMount() {
    Auth.onChange = this.updateAuth;
  }

  render() {
    const { children } = this.props;
    const { isUserAuthenticated } = this.state;
    const navLinkProps = {
      className: 'layout__nav-link',
      activeClassName: 'layout__nav-link--selected'
    };

    return (
      <div className="layout layout--main">
        <nav className="layout__nav">
          <span className="layout__nav-header">React Lego</span>
          <NamedLink to='homepage' { ...navLinkProps } />
          <NamedLink to="game" { ...navLinkProps } />
          <NamedLink to="dashboard" { ...navLinkProps } />
          <MyAccount navLinkProps={ navLinkProps } isUserAuthenticated={ isUserAuthenticated }/>
        </nav>
        <main className="layout__content">
          {children}
        </main>
        <footer className="layout__footer">
          Hosted at <a href="http://github.com/peter-mouland/react-lego">github.com/peter-mouland/react-lego</a>
        </footer>
      </div>
    );
  }
}
