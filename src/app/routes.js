import React from 'react';
import Route from 'react-router-dom/Route';
import Link from 'react-router-dom/Link';
import Switch from 'react-router-dom/Switch';
import bemHelper from 'react-bem-helper';
import debug from 'debug';

import MainLayout from './Layouts/MainLayout';
import Homepage from './containers/Homepage/Homepage';
import DashboardPage from './containers/DashboardPage/DashboardPage';
import Game from './containers/Game/Game';
import NotFound from './containers/NotFound/NotFound';

import LoginPage from './authentication/containers/LoginPage/LoginPage';
import LogOut from './authentication/components/LogOut/LogOut';
import RouteWithAuthCheck from './authentication/components/RouteWithAuthCheck/RouteWithAuthCheck';

debug('lego:routes');

const baseMetaData = {
  title: 'React Lego',
  description: 'React-lego : incrementally add more cool stuff to your react app',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'react,example'
    }
  }
};

export function getRoutesConfig() {
  return [
    {
      name: 'homepage',
      exact: true,
      path: '/',
      meta: {
        ...baseMetaData,
        title: 'About React Lego'
      },
      label: 'About React Lego',
      component: Homepage
    },
    {
      name: 'game',
      path: '/game/',
      label: 'Star Wars Trivia',
      meta: {
        ...baseMetaData,
        title: 'Star Wars Trivia',
      },
      component: Game
    },
    {
      name: 'logout',
      path: '/logout/',
      label: 'Logout',
      meta: {
        ...baseMetaData,
        title: 'Logout',
      },
      component: LogOut
    },
    {
      name: 'login',
      path: '/login/',
      label: 'Login',
      meta: {
        ...baseMetaData,
        title: 'Login',
      },
      component: LoginPage
    },
    {
      name: 'dashboard',
      path: '/dashboard/',
      requiresAuthentication: true,
      label: 'Dashboard',
      meta: {
        ...baseMetaData,
        title: 'Dashboard',
      },
      component: DashboardPage
    }
  ];
}

// test this. no failing test if getRoutesConfig instead of getRoutesConfig()
export const findRoute = (to) => getRoutesConfig().find((rt) => rt.name === to);

// test this active link and route matching
export const NamedLink = ({ className, to, children, ...props }) => {
  const bem = bemHelper({ name: 'link' });
  const route = findRoute(to);
  if (!route) throw new Error(`Route to '${to}' not found`);
  return (
    <Route path={ route.path } exact children={({ match }) => (
      <Link to={ route.path } { ...props } { ...bem(null, { active: match }, className) }>
        { children || route.label }
      </Link>
    )} />
  );
};

export function makeRoutes() {
  return (
    <MainLayout>
      <Switch>
        {getRoutesConfig().map((route) => <RouteWithAuthCheck {...route} key={ route.name } />)}
        <Route title={'Page Not Found - React Lego'} component={ NotFound }/>
      </Switch>
    </MainLayout>
  );
}
