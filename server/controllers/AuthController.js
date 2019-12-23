// const { User } = require('../models/index');
const uuidv5 = require('uuid/v5');
const authService = require('../services/auth.service');
const { to, ReE, ReS } = require('../services/util.service');

const Register = async function (req, res) {
    const body = req.body;

    if (!body.unique_key && !body.email) {
        return ReE(res, 'Silakan masukkan email untuk mendaftar.');
    } else if (!body.password) {
        return ReE(res, 'Silakan masukkan kata sandi untuk mendaftar.');
    } else if (!body.firstName) {
        return ReE(res, 'Silahkan masukkan nama depan untuk mendaftar.');
    } else if (!body.lastName) {
        return ReE(res, 'Silahkan masukkan nama belakang untuk mendaftar.');
    } else if (!body.username) {
        return ReE(res, 'Silahkan masukkan username untuk mendaftar.');
    } else {
        body.uuid = uuidv5(body.username, uuidv5.URL);

        let err, model;
        [err, model] = await to(authService.createUser(body));

        if (err) return ReE(res, err, 422);

        // return ReS(res, { message: 'Berhasil membuat akun baru.', user: user.toWeb(), token: user.getJWT() }, 201);

        return ReS(res, {
            code: "200",
            results: {
                email: user.email,
                username: user.username
            }
        });
    }
}
module.exports.Register = Register;

const Login = async function (req, res) {
    const body = req.body;
    let err, user;

    [err, user] = await to(authService.authUser(req.body));
    if (err) return ReE(res, err, 422);

    return ReS(res, {
        code: "200",
        results: {
            token: user.getJWT(),
            email: user.email,
            username: user.username
        }
    });
}
module.exports.Login = Login;