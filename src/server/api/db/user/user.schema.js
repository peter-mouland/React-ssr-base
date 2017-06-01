const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// define the User model schema
const UserSchema = new mongoose.Schema({
  dateCreated: { type: Date, default: Date.now },
  email: {
    type: String,
    index: { unique: true }
  },
  salt: String,
  tmpToken: String,
  isAdmin: {
    type: Boolean,
    default: false
  },
  name: String,
  password: String,
  mustChangePassword: {
    type: Boolean,
    default: true
  }
});


/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 */
UserSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};

UserSchema.methods.hashPassword = function hasPassword(password, callback) {
  bcrypt.genSalt((saltError, salt) => {
    if (saltError) {
      return callback(saltError);
    }
    return bcrypt.hash(password, salt, (hashError, hash) => {
      if (hashError) {
        return callback(hashError);
      }

      return callback(null, { hash, salt });
    });
  });
};

/**
 * The pre-save hook method.
 */
UserSchema.pre('save', function saveHook(next) {
  const user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();

  return user.hashPassword(user.password, (passwordErr, password) => {
    if (passwordErr) next(passwordErr);
    user.password = password.hash;
    user.salt = password.salt;
    return next();
  });
});


module.exports = mongoose.model('User', UserSchema);
