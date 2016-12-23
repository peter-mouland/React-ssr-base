/*
  copied from the great BrekoHub:
  https://github.com/tomatau/breko-hub/blob/master/src/helpers/hotReload.js
*/

import chokidar from 'chokidar';
import debug from 'debug';
import webpack from 'webpack';

import webpackDevelopmentConfig from '../../config/webpack.config.dev';
// import { isomorphicTools } from '../isomorphic-tools'
import { SERVER } from '../../config/paths';

const log = {
  webpack: debug('webpack'),
  hot: debug('hot-reload'),
};

export default function hotReload(app) {
  const compiler = webpack(webpackDevelopmentConfig);

  compiler.plugin('compile', () => log.webpack('Webpack compile started...'));
  compiler.plugin('compilation', () => log.webpack('Webpack compiling...'));

  app.use(require('koa-webpack-dev-middleware')(compiler, {  // eslint-disable-line
    quiet: true,
    noInfo: true,
    stats: {
      colors: true,
      reasons: true,
    },
    publicPath: webpackDevelopmentConfig.output.publicPath,
  }));

  app.use(require('koa-webpack-hot-middleware')(compiler)); // eslint-disable-line

  const watcher = chokidar.watch(SERVER);
  log.hot('Watching server source');
  watcher.on('ready', () => {
    watcher.on('all', () => {
      log.hot('Clearing /server/ module cache from server');
      Object.keys(require.cache).forEach((id) => {
        if (/\/server\//.test(id)) delete require.cache[id];
      });
    });
  });

  log.hot('Watching client app source');
  compiler.plugin('done', () => {
    log.hot('Clearing /app/ module cache from server');
    Object.keys(require.cache).forEach((id) => {
      if (/\/app\//.test(id)) delete require.cache[id];
      if (/\/server\//.test(id)) delete require.cache[id];
    });
    // isomorphicTools.refresh()
  });
}
