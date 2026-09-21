const express = require('express')
const router = express.router()
const { register, login } = require('../controllers/userController')

router.post('/register', register)
router.post('/login', login)