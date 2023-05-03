const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
require('dotenv').config() ;


router.post('/login',authController.login)
router.get('/validate',authController.validateToken)

module.exports = router;