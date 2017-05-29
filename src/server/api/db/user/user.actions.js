const debug = require('debug');
const User = require('mongoose').model('User');

const log = debug('base:db/user.actions');

export const saveNewUser = (userData) => {
  const newUser = new User(userData);
  return newUser.save();
};

export const findOneUser = (userDetails) => User.findOne(userDetails).exec();

export const updateUser = (id, userDetails) =>
  User.findByIdAndUpdate(id, userDetails, { new: true }).exec();
