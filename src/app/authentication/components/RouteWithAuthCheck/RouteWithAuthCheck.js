import React from 'react';
import Redirect from 'react-router-dom/Redirect';
import Route from 'react-router-dom/Route';
import debug from 'debug';
import DocumentMeta from 'react-document-meta';

import Auth from '../../auth-helper';

const log = debug('base:RouteWithAuthCheck');

const RouteWithAuthCheck = ({ component: Component, requiresAuthentication, meta, ...props }) => {
  const redirect = requiresAuthentication && !Auth.validateToken();
  log('redirect', redirect);
  return (
    <Route {...props} render={(matchProps) => (
      <span>
        <DocumentMeta { ...meta }/>
        { redirect ?
          (<Redirect to={{
            pathname: '/login',
            state: { from: matchProps.location }
          }}/>
          ) : <Component {...matchProps}/>
        }
      </span>
    )}/>
  );
};

export default RouteWithAuthCheck;
