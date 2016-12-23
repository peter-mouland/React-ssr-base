import get from 'lodash/get';

export { fetch, json } from './fetch';
export { randomRange } from './randomRange';

const navigator = get(global, 'navigator.userAgent');
// hasWindow = true for tests + client
export const hasWindow = typeof window !== 'undefined';
// isBrowser = true for client only
export const isBrowser = typeof navigator !== 'undefined' && navigator.indexOf('Node.js') === -1;

export const localUrl = isBrowser
  ? (new window.URL(window.location)).origin
  : `http://localhost:${process.env.PORT}`;
