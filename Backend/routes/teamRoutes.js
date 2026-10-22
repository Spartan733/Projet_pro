const express = require('express')
const router = express.Router()
const { addTeam, getTeams, getTeamsById, updateTeam, deleteTeam } = require('../controllers/teamController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, addTeam)
router.get('/', getTeams)
router.get('/:id', getTeamsById)
router.put('/:id', updateTeam)
router.delete('/:id', deleteTeam)

module.exports = router