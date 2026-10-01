const express = require('express')
const router = express.Router()

const { addConvention } = require('../controllers/conventionController')

router.post('/create', addConvention)

module.exports = router
