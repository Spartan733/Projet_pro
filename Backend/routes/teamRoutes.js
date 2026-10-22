const express = require('express')
const router = express.Router()
const { addTeam } = require('../controllers/teamController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, addTeam)

module.exports = router