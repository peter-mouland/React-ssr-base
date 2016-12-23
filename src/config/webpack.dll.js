const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: [path.join(process.cwd(), 'src', 'vendor.js')]
  },
  output: {
    path: path.join(process.cwd(), 'compiled', 'dist'),
    filename: '[name].dll.js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(process.cwd(), 'compiled', '[name]-manifest.json'),
      name: '[name]',
      context: path.resolve(process.cwd(), 'src')
    }),
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.scss']
  }
};
