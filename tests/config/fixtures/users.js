//https://docs.mongodb.com/manual/reference/mongo-shell/
// use react_app--test
// db.users.find()

const mongoose = require('mongoose');
const assert = require('assert');

const User = mongoose.model('User');

module.exports.puke = (user) => new Promise((resolve, reject) => {
  console.log('inserting test users....');
  User.collection.insert(user, function (err, r) {
    assert.equal(null, err);
    console.log(r);
    if (err){
      reject(err);
    } else {
      resolve(r.insertedIds);
    }
  });
});


module.exports.nuke = (user) => new Promise((resolve, reject) => {
  console.log(`removing ${user} from ${User.db.name}....`);
  User.remove(user, (err, r)=>{
      assert.equal(null, err);
      // assert.equal(1, r.nRemoved);
      if (err){
        reject(err);
      } else {
        resolve(r.nRemoved);
      }
    });
});


