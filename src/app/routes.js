import React from 'react';
import Route from 'react-router-dom/Route';
import Link from 'react-router-dom/Link';
import Switch from 'react-router-dom/Switch';
// import DocumentMeta from 'react-document-meta';
import debug from 'debug';

import MainLayout from './Layouts/MainLayout';
import Homepage from './containers/Homepage/Homepage';
import DashboardPage from './containers/DashboardPage/DashboardPage';
import Game from './containers/Game/Game';
import NotFound from './containers/NotFound/NotFound';

import LoginPage from './authentication/containers/LoginPage/LoginPage';
import LogOut from './authentication/components/LogOut/LogOut';
import SignUpPage from './authentication/containers/SignUpPage/SignUpPage';
import PrivateRoute from './authentication/components/PrivateRoute/PrivateRoute';

debug('lego:routes');

const siteTitle = 'React Lego';

export const routes = [
  {
    name: 'homepage',
    exact: true,
    path: '/',
    label: 'About React Lego',
    title: 'About React Lego',
    component: Homepage
  },
  {
    name: 'game',
    path: '/game/',
    label: 'Star Wars Trivia',
    title: 'Star Wars Trivia',
    component: Game
  },
  {
    name: 'logout',
    path: '/logout/',
    label: 'Logout',
    title: 'Logout',
    component: LogOut
  },
  {
    name: 'login',
    path: '/login/',
    label: 'Login',
    title: 'Login',
    component: LoginPage
  },
  {
    name: 'signup',
    path: '/signup',
    label: 'Sign Up',
    title: 'Sign Up',
    component: SignUpPage
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    requiresAuthentication: true,
    label: 'Dashboard',
    title: 'Dashboard',
    component: DashboardPage
  }
];

export const findRoute = (to) => routes.find((rt) => rt.name === to);

export const NamedLink = ({ index, onlyActiveOnIndex, activeClassName, to, children, ...props }) => {
  const route = findRoute(to);
  if (!route) throw new Error(`Route to '${to}' not found`);
  return (
    <Link to={ route.path } { ...props }>
      { children || route.label }
    </Link>
  );
};

export function makeRoutes() {
  return (
    <MainLayout>
      <Switch>
        {routes.map((route) => {
          return (
            route.requiresAuthentication
              ? <PrivateRoute { ...route } key={ route.name } />
              : <Route {...route} key={ route.name } />
          );
        })}
        <Route title={`${siteTitle} - Page Not Found`} component={ NotFound }/>
      </Switch>
    </MainLayout>
  );
}
