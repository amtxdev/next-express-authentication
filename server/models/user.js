'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require("jsonwebtoken");
const { TE, to } = require('../services/util.service');
const CONFIG = require('../config/config');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      unique: true,
      validate: {
        isEmail: true
      }
    },

    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
      unique: true
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
      unique: true
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },

    verified: DataTypes.BOOLEAN
  }, {});

  User.associate = function (models) {

  };

  User.beforeSave(async (users, options) => {
    let err;
    if (users.changed('password')) {
      let salt, hash
      [err, salt] = await to(bcrypt.genSalt(10));
      if (err) TE(err.message, true);

      [err, hash] = await to(bcrypt.hash(users.password, salt));
      if (err) TE(err.message, true);

      users.password = hash;
    }
  });

  User.prototype.comparePassword = async function (pw) {
    let err, pass
    if (!this.password) TE('Kata sandi belum di masukkan');

    [err, pass] = await to(bcrypt_p.compare(pw, this.password));
    if (err) TE(err);

    if (!pass) TE('Kata sandi salah');

    return this;
  }

  User.prototype.getJWT = function () {
    let expiration_time = parseInt(CONFIG.jwt_expiration);
    // return "Bearer " + jwt.sign({ user_id: this.id }, CONFIG.jwt_encryption, { expiresIn: expiration_time });
    return jwt.sign({ user_id: this.id }, CONFIG.jwt_encryption, { expiresIn: expiration_time });
  };

  User.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };

  return User;
};

// module.exports = function(sequelize, DataTypes) {
//   var User = sequelize.define('User', {
//     firstName: DataTypes.STRING,
//     lastName: DataTypes.STRING,
//     email: DataTypes.STRING,
//     uuid: DataTypes.STRING,
//     username: DataTypes.STRING,
//     password: DataTypes.STRING,
//     verified: DataTypes.BOOLEAN
//   }, {
//     classMethods: {
//       associate: function(models) {
//        User.hasOne(models.VerificationToken, {
//             as: 'verificationtoken',
//             foreignKey: 'userId',
//             foreignKeyConstraint: true,
//           });
//       }
//     }
//   });
//   return User;
// };  