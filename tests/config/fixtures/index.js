//https://docs.mongodb.com/manual/reference/mongo-shell/
const mongoose = require('mongoose');

const authJourneyFixtures = require('./auth-journey');

module.exports = () => {
  const db = mongoose.connections[0];
  if (db.name.indexOf('--test') < 0){
    return Promise.reject('Connected to ' + db.name);
  } else {
    console.log('Loading fixtures....');
    const fixturePromises = [
      authJourneyFixtures()
    ];
    return Promise.all(fixturePromises);
  }
};
