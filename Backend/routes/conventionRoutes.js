const express = require('express')
const router = express.Router()
const { addConvention, getConventions, getConventionById, updateConvention, deleteConvention } = require('../controllers/conventionController')

router.post('/create', addConvention)
router.get('/', getConventions)
router.get('/:id', getConventionById)
router.put('/:id', updateConvention)
router.delete('/:id', deleteConvention)

module.exports = router
