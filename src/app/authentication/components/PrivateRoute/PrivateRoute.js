import React from 'react';
import Redirect from 'react-router-dom/Redirect';
import Route from 'react-router-dom/Route';
import debug from 'debug';

import Auth from '../../auth-helper';

debug('lego:PrivateRoute');

const PrivateRoute = ({ component: component, ...rest }) => {
  debug('isUserAuthenticated', Auth.isUserAuthenticated());
  return <Route {...rest} render={(props) => (
    Auth.isUserAuthenticated()
      ? (React.createElement(component, props))
      : (<Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      )
  )}/>;
};

export default PrivateRoute
