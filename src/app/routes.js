import React from 'react';
import Match from 'react-router/Match';
import Miss from 'react-router/Miss';
import Redirect from 'react-router/Redirect';
import NamedLink from 'react-router-addons-routes/NamedLink';
import RoutesProvider from 'react-router-addons-routes/RoutesProvider';
import MatchWithRoutes from 'react-router-addons-routes/MatchWithRoutes';
import DocumentMeta from 'react-document-meta';
import debug from 'debug';

import MainLayout from './Layouts/MainLayout';
import Homepage from './containers/Homepage/Homepage';
import DashboardPage from './containers/DashboardPage/DashboardPage';
import Game from './containers/Game/Game';
import NotFound from './containers/NotFound/NotFound';
import LoginPage from './containers/LoginPage/LoginPage';
import SignUpPage from './containers/SignUpPage/SignUpPage';
import Auth from './modules/Auth';

debug('lego:routes');

const siteTitle = 'React Lego';

const LogOut = React.createClass({
  componentDidMount() {
    Auth.logout();
  },

  render() {
    return <p>You are now logged out</p>;
  }
});

const MatchWhenAuthorized = ({ component: Component, ...rest }) => {
  return (
    <Match {...rest} render={(props) => (
      Auth.isUserAuthenticated()
        ? (<Component {...props}/>)
        : (<Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
        )
    )}/>
  )
};

export const routes = [
  {
    name: 'homepage',
    exactly: true,
    pattern: '/',
    label: 'About React Lego',
    title: 'About React Lego',
    component: Homepage
  },
  {
    name: 'game',
    pattern: '/game(/)?',
    label: 'Star Wars Trivia',
    title: 'Star Wars Trivia',
    component: Game
  },
  {
    name: 'logout',
    pattern: '/logout(/)?',
    label: 'Logout',
    title: 'Logout',
    component: LogOut
  },
  {
    name: 'login',
    pattern: '/login(/)?',
    label: 'Login',
    title: 'Login',
    component: LoginPage
  },
  {
    name: 'signup',
    pattern: '/signup(/)?',
    label: 'Sign Up',
    title: 'Sign Up',
    component: SignUpPage
  },
  {
    name: 'dashboard',
    pattern: '/dashboard(/)?',
    requiresAuthentication: true,
    label: 'Dashboard',
    title: 'Dashboard',
    component: DashboardPage
  }
];

export const findRoute = (to) => routes.find((rt) => rt.name === to);

export const LinkHelper = ({ to, ...props }) => {
  const route = findRoute(to);
  if (!route) throw new Error(`Route to '${to}' not found`);
  return (
    <NamedLink to={ to } { ...props }>
      { props.children || route.label }
    </NamedLink>
  );
};

const Route = ({ route }) => (
  route.requiresAuthentication
    ? <MatchWhenAuthorized { ...route }/>
    : <span>
        <Match {...route} render={() => <DocumentMeta title={ route.title }/> } />
        <MatchWithRoutes {...route} />
      </span>
);

export function makeRoutes() {
  return (
    <RoutesProvider routes={routes}>
      <MainLayout>
        {routes.map((route) => (<Route key={route.name} route={ route }/>))}
        <Miss title={`${siteTitle} - Page Not Found`} component={ NotFound }/>
      </MainLayout>
    </RoutesProvider>
  );
}
