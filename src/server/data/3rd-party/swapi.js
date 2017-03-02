import debug from 'debug';

import { json } from '../../../app/utils';

const log = debug('base:swapi');
export const swapiData = (api, id) => json.get(`http://swapi.co/api/${api}/${id}/`);
