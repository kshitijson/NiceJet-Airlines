const express = require('express');
const router = express.Router();
const signupController = require('../controllers/auth/signupController.js')
const loginController = require('../controllers/auth/loginController.js')

router.post('/signup', signupController.signup);
router.post('/authenticate', loginController.login)

module.exports = router;