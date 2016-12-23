export default (process.env.NODE_ENV === 'development')
  ? require('react-hot-loader').AppContainer // eslint-disable-line
  : ({ children }) => (children);
