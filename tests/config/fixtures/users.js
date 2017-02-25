//https://docs.mongodb.com/manual/reference/mongo-shell/
// use react_app--test
// db.users.find()
const mongoose = require('mongoose');
const assert = require('assert');

const User = mongoose.model('User');
const data = [{
  email: 'test@ssr.com',
  password: 'test@ssr.com',
  name: 'test@ssr.com'
}];

module.exports = () => new Promise((resolve, reject) => {
  console.log(`removing users from ${User.db.name}....`);
  User.remove({}, ()=>{
    console.log('inserting test users....');
    User.collection.insertMany(data, function (err, r) {
      assert.equal(null, err);
      assert.equal(data.length, r.insertedCount);
      if (err){
        reject(err);
      } else {
        resolve(r.insertedIds);
      }
    });
  });
});


