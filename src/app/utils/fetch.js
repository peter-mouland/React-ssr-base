import axios from 'axios';
import debug from 'debug';

import { localUrl } from '../utils';
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

const fetchUrl = (endpoint, opts = {}) => {
  const token = Auth.getToken();
  opts.headers = Object.assign({}, opts.headers, token ? { Authorization: `Bearer ${token}` } : {});
  const url = endpoint.indexOf('//') > -1 ? endpoint : `${localUrl}${endpoint}`;
  return axios({ url, ...opts })
    .then(checkStatus)
    .then((response) => response.data)
    .catch((error) => {
      log('request failed', error);
      throw new Error('request failed');
    });
};

const getJSON = (url, options) => fetchUrl(url, jsonOpts('GET', null, options));
const postJSON = (url, data, options) => fetchUrl(url, jsonOpts('POST', data, options));
const graphQL = (data, variables) => fetchUrl('/graphql/v1', graphQLOpts(data, variables));

export const fetch = {
  url: fetchUrl,
  graphQL
};
export const json = {
  get: getJSON,
  post: postJSON
};
