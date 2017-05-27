import axios from 'axios';
import debug from 'debug';

import { localUrl } from '../utils';
import { getVar } from '../../config/environment';
import Auth from '../authentication/auth-helper';

const log = debug('base:fetch');

export function checkStatus(response) {
  if (response.status < 200 || response.status >= 500) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
}

const jsonOpts = (method, data) => ({
  method,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    credentials: 'same-origin',
  },
  data: data && JSON.stringify(data)
});

const graphQLOpts = (data, params = {}) => ({
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/graphql',
    credentials: 'same-origin',
  },
  data,
  params
});

const delay = (ms) => ( // eslint-disable-line no-unused-vars
  new Promise((resolve) => setTimeout(resolve, ms))
);

const fetchUrl = (endpoint, opts = {}) => {
  const token = Auth.getToken();
  opts.headers = Object.assign({}, opts.headers, token ? { Authorization: `Bearer ${token}` } : {});
  const url = endpoint.indexOf('//') > -1 ? endpoint : `${localUrl}${endpoint}`;
  return Promise.resolve()
    .then(() => delay(3000)) // used to help dev / testing
    .then(() => axios({ url, ...opts }))
    .then(checkStatus)
    .then((response) => response.data)
    .catch((error) => {
      log('request failed', error);
      throw new Error('request failed');
    });
};

const getJSON = (url, options) => fetchUrl(url, jsonOpts('GET', null, options));
const postJSON = (url, data, options) => fetchUrl(url, jsonOpts('POST', data, options));
const graphQL = (data, variables) => fetchUrl(getVar('GRAPHQL_URL'), graphQLOpts(data, variables));

export const fetch = {
  url: fetchUrl,
  graphQL
};
export const json = {
  get: getJSON,
  post: postJSON
};
