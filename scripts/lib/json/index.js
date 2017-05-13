import debug from 'debug';
import mkdirp from 'mkdirp';
import fs from 'fs';
import path from 'path';

const getDirName = path.dirname;
const log = debug('footy:json/index');

const writeJson = (file, json, resolve) => {
  return mkdirp(getDirName(file), (err) => {
    if (err) return log(err);
    return fs.writeFile(file, JSON.stringify(json, null, 2), (stringyErr) => {
      if (stringyErr) log(stringyErr);
      log(`${file} saved`);
      resolve();
    });
  });
};

function saveJson(result, file) {
  return new Promise((resolve) => {
    writeJson(file, result, resolve);
  });
}

export default {
  save: saveJson
};
