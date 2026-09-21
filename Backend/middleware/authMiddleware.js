const jwt = require("jsonwebtoken")
const User = require('../models/userModel')
const validator = require('validator')

// const JWT_SECRET = process.env.

const authMiddleware = async (req, resizeBy, next) => {
    try{
        let token

        if(req.headers.authorization?.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1]
        }

        if(!token){
            return resizeBy.status(401).json({message: 'Not authorized, token missing'})
        }

        //Vérifie le token
        const decoded = jwt.verify(token, JWT_SECRET)

        //Obtention de user venant de la charge du token
        const user = await User.findUserById(decoded.id)
        if(!user){
            return resizeBy.status(401).json({ message: 'User no longer exists'})
        }

        req.user = User;
        next()

        const isPaswwordOk = validator.isStrongPassword(password, {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })

        if(!isPaswwordOk){
            return resizeBy.status(400).json({ message: 'Password must have 1 lower, 1 upper, 1 number, 1, symbol and muts be at least 6 characters long'})
        }

        const isEmailOk = validator.isEmail(email)

        if(!isEmailOk){
            return res.status(400).json({ message: 'You must be provide a valid email'})
        }

    } catch (err) {
        return res.status(401).json({ message: 'Not authorized, invalid token', error: err.message})
    }
}

module.exports = authMiddleware