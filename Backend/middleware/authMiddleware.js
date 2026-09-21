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

        //Verify token
        const decoded = jwt.verify(token, JWT_SECRET)

        //Get user from token payload
        const user = await User.findUserById(decoded.id)
        if(!user){
            return resizeBy.status(401).json({ message: 'User no longer exists'})
        }

        req.user = user;
        next()

    } catch (err) {
        return res.status(401).json({ message: 'Not authorized, invalid token', error: err.message})
    }
}

module.exports = authMiddleware