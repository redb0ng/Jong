const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
// const jwt = require("jsonwebtoken");

const user3Schema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 10,
  },
  address: {
    type: String,
    minlength: 2,
  },
  id: {
    type: String,
    minlength: 2,
  },
  age: {
    type: Number,
    maxlength: 5,
  },
  //   role: {
  //     type: Number,
  //     default: 0,
  //   },
  //   image: String,
  //   token: {
  //     type: String,
  //   },
  //   tokenExp: {
  //     type: Number,
  //   },
});

user3Schema.pre("save", function (next) {
  var user3 = this;

  if (user3.isModified("id")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(user3.id, salt, function (err, hash) {
        if (err) return next(err);
        user3.id = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// userSchema.methods.comparePassword = function (plainPassword, cb) {
//   bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });
// };

// userSchema.methods.generateToken = function (cb) {
//   var user = this;

//   var token = jwt.sign(user._id.toHexString(), "secretToken");

//   user.token = token;
//   user.save(function (err, user) {
//     if (err) return cb(err);
//     cb(null, user);
//   });
// };

// userSchema.statics.findByToken = function (token, cb) {
//   var user = this;

//   jwt.verify(token, "secretToken", function (err, decoded) {
//     user.findOne({ _id: decoded, token: token }, function (err, user) {
//       if (err) return cb(err);
//       cb(null, user);
//     });
//   });
// };

const User3 = mongoose.model("User3", user3Schema);

module.exports = { User3 };

// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const config = require("../config/database");

// // reUser Schema
// const reUserSchema = mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//   },
//   date: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: false,
//   },
// });

// const reUser = mongoose.model("reUser", reUserSchema);
// reUser.getUserById = function (id, callback) {
//   reUser.findById(id, callback);
// };
// reUser.getUserByPhone = function (phone, callback) {
//   const query = { phone: phone };
//   User.findOne(query, callback);
// };
// reUser.addUser = function (renewUser, callback) {
//   bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(renewUser.phone, salt, (err, hash) => {
//       if (err) throw err;
//       renewUser.phone = hash;
//       renewUser.save(callback);
//     });
//   });
// };

// // Return all user list
// User.getAll = function (callback) {
//   User.find(callback);
// };

// module.exports = reUser;
