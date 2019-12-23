const cryptoRandomString = require('crypto-random-string');
const { sendVerificationEmail } = require('../helper/SendGridEmailHelper');
const models = require('../models'); 

const Register = (req, res, next) => {
  return models.User.findOrCreate({
    where: { email:  req.body.email },
    defaults: req.body
  })
  .spread((user, created) => {
    // if user email already exists
    if(!created) {
      return res.status(409).json('User with email address already exists');
    } else {
      return models.VerificationToken.create({
        userId: user.id,
        token: cryptoRandomString({length: 10}),
      }).then((result) => {
        sendVerificationEmail(user.email, result.token);
        return res.status(200).json(`${user.email} account created successfully`);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
    }
  })
  .catch((error) => {
    return res.status(500).json(error);
  });
};

module.exports.Register = Register;