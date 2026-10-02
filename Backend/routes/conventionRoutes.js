const express = require('express')
const router = express.Router()
const { addConvention, getConventions, getConventionById, updateConventions } = require('../controllers/conventionController')

router.post('/create', addConvention)
router.get('/', getConventions)
router.get('/:id', getConventionById)
router.put('/:id/update', updateConventions)

module.exports = router
