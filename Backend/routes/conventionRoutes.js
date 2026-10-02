const express = require('express')
const router = express.Router()

const { addConvention, getAllConventions } = require('../controllers/conventionController')

router.post('/create', addConvention)
router.get('/getConventions', getAllConventions)

module.exports = router
