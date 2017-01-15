import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import debug from 'debug';

import HmrContainer from './app/containers/HmrContainer/HmrContainer';
import Root from './app/Root';
import './styles/app.scss';

debug.enable(process.env.DEBUG);

const log = debug('lego:client-entry');
log('Client environment', process.env);

const rootEl = document.getElementById('html');
const App = (
  <HmrContainer>
    <Root />
  </HmrContainer>
);

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

try {
  ReactDOM.render(App, rootEl);
  if (module.hot) {
    module.hot.accept('./app/Root', () => {
      const NextApp = require('./app/Root').default; // eslint-disable-line
      ReactDOM.render(
        <HmrContainer>
          <NextApp />
        </HmrContainer>,
        rootEl
      );
    });
  }
} catch (err) {
  log('Render error', err);
}

export default App;
