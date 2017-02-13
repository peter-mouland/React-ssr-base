import React from 'react';
import debug from 'debug';

debug('base:Homepage.jsx');

export default class Homepage extends React.Component {

  render() {
    return (
      <div id="homepage">
        <banner className="header">
          <h1>About React SSR Base</h1>
        </banner>
      </div>
    );
  }
}
