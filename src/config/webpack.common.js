const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const cssnano = require('cssnano');

const { SRC, DIST } = require('./paths');

module.exports = {
  devtool: 'eval',
  cache: true,
  context: SRC,
  output: {
    path: DIST,
    filename: '[name]-[hash].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ names: ['vendor'], minChunks: Infinity }),
    new ExtractTextPlugin('[name]-[hash].css'),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.PORT': JSON.stringify(process.env.PORT),
      'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new AssetsPlugin({ filename: 'src/webpack-assets.json' }),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          cssnano({
            autoprefixer: {
              browsers: [
                'safari 9',
                'ie 10-11',
                'last 2 Chrome versions',
                'last 2 Firefox versions',
                'edge 13',
                'ios_saf 9.0-9.2',
                'ie_mob 11',
                'Android >= 4'
              ],
              cascade: false,
              add: true,
              remove: true
            },
            safe: true
          })
        ]
      }
    })
  ],
  resolve: {
    modules: ['node_modules', SRC],
    extensions: ['.js', '.jsx', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [/src/],
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.scss$/,
        include: [/src/],
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.svg$/,
        include: [/src/],
        loader: 'svg-inline-loader',
        options: {
          removeSVGTagAttrs: false
        }
      }
    ]
  }
};
