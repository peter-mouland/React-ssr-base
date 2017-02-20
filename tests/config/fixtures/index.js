//https://docs.mongodb.com/manual/reference/mongo-shell/
const mongoose = require('mongoose');

const users = require('./users');
let results;

module.exports = () => {
  if (results) return results;
  const db = mongoose.connections[0];
  if (db.name.indexOf('--test') < 0){
    results = Promise.reject('Connected to ' + db.name);
  } else {
    console.log('Loading fixtures....');
    const fixturePromises = [
      users()
    ];
    results = Promise.all(fixturePromises);
  }
  return results;
};
