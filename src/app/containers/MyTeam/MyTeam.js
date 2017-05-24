import React from 'react';
import debug from 'debug';
import bemHelper from 'react-bem-helper';

import './my-team.scss';

const bem = bemHelper({ name: 'my-team' });
debug('base:Players');

export default class MyTeam extends React.Component {

  render() {
    return (
      <div { ...bem() } id="my-team">
        <h1>My Team</h1>
      </div>
    );
  }
}
