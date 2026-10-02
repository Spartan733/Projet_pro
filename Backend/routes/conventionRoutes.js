const express = require('express')
const router = express.Router()
const { addConvention, getConventions, getConventionById } = require('../controllers/conventionController')

router.post('/create', addConvention)
router.get('/', getConventions)
router.get('/:id', getConventionById)

module.exports = router
