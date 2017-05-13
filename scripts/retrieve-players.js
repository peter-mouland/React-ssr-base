#!/usr/bin/env node
import debug from 'debug';

import GoogleSpreadsheet from './lib/google-sheets';
import creds from './lib/google-sheets/google-generated-creds.json';
import json from './lib/json';

const log = debug('footy:retrieve-player-positions');

const createJsonObj = (item) => {
  delete item._xml;
  delete item.id;
  delete item._links;
  Object.keys(item).map(key => {
    const val = parseInt(item[key]);
    if (!!val || val === 0) {
      item[key] = val;
    }
  });
  return {
    [item.player]: item
  };
};

const spreadsheet = new GoogleSpreadsheet('1HkXbfjAXr7FB2mN8kTcIRI6Camxlo6hgjwhP47y3EC4', creds);

function extractGameWeek(week){
  const playerListSheet = spreadsheet.getWorksheet(`GW${week}`);
  playerListSheet
    .toJson(createJsonObj)
    .then((jsonData) => json.save(jsonData, `scripts/stats-GW${week}.json`))
    .then(() => log('done.'))
    .catch(e => log(e));

}

extractGameWeek(25);
