#!/usr/bin/env node
import debug from 'debug';

import GoogleSpreadsheet from '../src/server/lib/google-sheets';
import creds from '../src/server/lib/google-sheets/google-generated-creds.json';
import json from '../src/server/lib/json';

const log = debug('footy:retrieve-player-positions');

const createJsonObj = (item) => ({
  [item.player]: {
    code: item.code,
    pos: item.pos,
    player: item.player,
    club: item.club,
  }
});

const spreadsheet = new GoogleSpreadsheet('1x2qD0aS6W-MeARu6QT0YthgLV91-Hmlip5_Gut2nEBI', creds);
const playerListSheet = spreadsheet.getWorksheet('player list');

playerListSheet
  .toJson(createJsonObj)
    .then((jsonData) => json.save(jsonData, 'src/server/api/ff.json'))
    .then(() => log('done.'))
    .catch(e => log(e));
