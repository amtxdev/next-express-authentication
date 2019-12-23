const { User } = require('../models/user');
const validator = require('validator');
const { to, TE } = require('../services/util.service');
const model = require('../models/index');

const getUniqueKeyFromBody = function (body) {
    let unique_key = body.unique_key;
    if (typeof unique_key === 'undefined') {
        if (typeof body.email != 'undefined') {
            unique_key = body.email
        } else if (typeof body.phone != 'undefined') {
            unique_key = body.phone
        } else {
            unique_key = null;
        }
    }
    return unique_key;
}
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;

const createUser = async (userInfo) => {
    let unique_key, auth_info, err;

    auth_info = {};
    auth_info.status = 'create';

    unique_key = getUniqueKeyFromBody(userInfo);
    if (!unique_key) TE('Email belum di inputkan');

    if (validator.isEmail(unique_key)) {
        auth_info.method = 'email';
        userInfo.email = unique_key;
        // userInfo.uuid = uuidv5(uuidv5.URL);

        [err, user] = await to(model.users.create(userInfo));
        // [err, user] = await to(User.create(userInfo));
        if (err) TE('Maaf, email sudah terdaftar');

        return user;

    } else {
        TE('Maaf, mohon masukkan email yang benar');
    }
}
module.exports.createUser = createUser;

const authUser = async function (userInfo) {
    //returns token
    let unique_key;
    let auth_info = {};
    auth_info.status = 'login';
    unique_key = getUniqueKeyFromBody(userInfo);

    if (!unique_key) TE('Silahkan masukkan email untuk masuk');


    if (!userInfo.password) TE('Silahkan masukkan password untuk masuk');

    let user;
    if (validator.isEmail(unique_key)) {
        auth_info.method = 'email';

        [err, user] = await to(model.users.findOne({ where: { email: unique_key } }));
        // [err, user] = await to(User.findOne({ where: { email: unique_key } }));
        if (err) TE(err.message);

    } else {
        TE('Email tidak valid');
    }

    if (!user) TE('Akun tidak terdaftar');

    [err, user] = await to(user.comparePassword(userInfo.password));

    if (err) TE(err.message);

    return user;

}
module.exports.authUser = authUser;