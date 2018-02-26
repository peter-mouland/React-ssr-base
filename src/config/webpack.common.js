const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const { SRC, DIST } = require('./paths');

module.exports = {
  context: SRC,
  output: {
    path: DIST,
    filename: '[name]-[hash].js',
    publicPath: '/'
  },
  plugins: [
    new ProgressBarPlugin(),
    new Visualizer({
      filename: '../webpack-stats.html'
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      'process.env.PORT': JSON.stringify(process.env.PORT),
      'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.GA_KEY': JSON.stringify(process.env.GA_KEY)
    }),
    new AssetsPlugin({ filename: 'compiled/webpack-assets.json' })
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
        test: /\.s?css$/,
        include: [/src/],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.svg$/,
        include: [/src/],
        loader: 'svg-inline-loader',
        options: {
          removeSVGTagAttrs: false
        }
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          'file-loader?name=[name]-[hash].[ext]'
        ]
      }
    ]
  }
};
