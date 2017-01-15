import React, { Component, PropTypes } from 'react';

import { LinkHelper } from '../routes';
import './mainLayout.scss';

export default class MainLayout extends Component {

  static propTypes = {
    location: PropTypes.object
  };

  render() {
    const { children } = this.props;
    const navLinkProps = {
      className: 'layout__nav-link',
      activeClassName: 'layout__nav-link--selected'
    };

    return (
      <div className="layout layout--main">
        <nav className="layout__nav">
          <span className="layout__nav-header">React Lego</span>
          <LinkHelper to='homepage' { ...navLinkProps } />
          <LinkHelper to="game" { ...navLinkProps } />
          <LinkHelper to="login" { ...navLinkProps } />
          <LinkHelper to="signup" { ...navLinkProps } />

        </nav>
        <div className="layout__content">
          {children}
        </div>
        <footer className="layout__footer">
          Hosted at <a href="http://github.com/peter-mouland/react-lego">github.com/peter-mouland/react-lego</a>
        </footer>
      </div>
    );
  }
}
