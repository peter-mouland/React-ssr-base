#!/usr/bin/env node
import GoogleSpreadsheet from './lib/google-sheets';
import creds from './lib/google-sheets/google-generated-creds.json';
import json from './lib/json';

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

function extractGameWeek(week){
  const spreadsheet = new GoogleSpreadsheet('1HkXbfjAXr7FB2mN8kTcIRI6Camxlo6hgjwhP47y3EC4', creds);
  const playerListSheet = spreadsheet.getWorksheet(`GW${week}`);
  playerListSheet
    .toJson(createJsonObj)
    .then((jsonData) => json.save(jsonData, `scripts/2016-2017/stats-GW${week}.json`))
    .then(() => console.log('done.'))
    .catch(e => console.log(e));

}

for (var i=1;i<27;i++){
  console.log('retrieving gw ' + i);
  extractGameWeek(i);
}
