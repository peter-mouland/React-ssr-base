import React from 'react';
import { Miss, Match } from 'react-router';
import { NamedLink, RoutesProvider, MatchWithRoutes } from 'react-router-addons-routes';
import DocumentMeta from 'react-document-meta';
import debug from 'debug';

import MainLayout from './Layouts/MainLayout';
import Homepage from './containers/Homepage/Homepage';
import Game from './containers/Game/Game';
import NotFound from './containers/NotFound/NotFound';
import LoginPage from './containers/LoginPage/LoginPage';
import SignUpPage from './containers/SignUpPage/SignUpPage';

debug('lego:routes');

const siteTitle = 'React Lego';

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
  <span>
    <Match {...route} render={() => <DocumentMeta title={ route.title }/>}/>
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
