const router = require('express').Router();
const ensureAuthenticated = require('../Middlewares/Auth');

const {getProfile, updateProfile} = require('../Controllers/AuthController');

router.get('/', ensureAuthenticated, getProfile);

router.put('/update', ensureAuthenticated, updateProfile);

module.exports = router;