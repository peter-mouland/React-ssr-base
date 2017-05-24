const User = require('mongoose').model('User');

export const saveNewUser = (userData) => new Promise((resolve, reject) => {
  const newUser = new User(userData);
  newUser.save((err, user) => {
    if (err) { return reject(err); }
    return resolve(user);
  });
});

export const findOneUser = (userDetails) => new Promise((resolve, reject) => {
  User.findOne(userDetails, (err, user) => {
    if (err || !user) {
      reject(err || { message: 'no user found' });
    } else {
      resolve(user);
    }
  });
});
