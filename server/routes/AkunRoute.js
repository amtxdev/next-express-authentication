const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/DashboardController');
const passport = require('passport');
require('../middlewares/passport')(passport);

// import permit from '../middlewares/permission';

router.get('/user', passport.authenticate('jwt', {session: false}), DashboardController.getalluser);

router.get('/userad', DashboardController.getalluser);

router.get('/:username', passport.authenticate('jwt', {session: false}), DashboardController.getUsername);

// router.get('/test', passport.authenticate('jwt', {session: true}), DashboardController.getalluser);

module.exports = router;