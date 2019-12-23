const authService = require('../services/auth.service');
const { to, ReE, ReS } = require('../services/util.service');
const model = require('../models/index');

const getalluser = async function (req, res) {
    let user = req.user;
    return ReS(res, { user: user.firstName, email: user.email });
}
module.exports.getalluser = getalluser;

const getUsername = async function (req, res) {
    let user = req.user;
    return ReS(res, { user: user.firstName, email: user.email });
}
module.exports.getUsername = getUsername;