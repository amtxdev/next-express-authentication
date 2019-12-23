const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const SignUpController = require('../controllers/SignUpController');
const VerificationController = require('../controllers/VerificationController');

//POST /signup
// router.post('/signup', SignUpController.Register);

// POST /verication?token=[string]&email=[string]
// router.post('/verification', VerificationController.VerificationController);

router.post('/registrasi', AuthController.Register);
router.post('/masuk', AuthController.Login);
router.get('/keluar', function(req, res) { req.logout(); res.redirect('/'); });
module.exports = router;