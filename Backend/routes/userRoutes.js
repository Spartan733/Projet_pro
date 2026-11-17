const express = require('express')
const router = express.Router()

const { register, login, getProfile, updateProfile } = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const uploadAvatar = require('../middleware/uploadAvatar')

router.post('/register', register)
router.post('/login', login)
router.get('/profil', authMiddleware, getProfile)
router.put('/modifie', authMiddleware,uploadAvatar.single("avatar"), updateProfile)

router.use((error, req, res, next) => {
    if(error){
        return res.status(400).json({ message: error.message})
    }
    next();
})

module.exports = router