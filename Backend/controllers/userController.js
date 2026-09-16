const jwt = require ('jsonwebtoken')
const User = require('../models/userModel')
const validator = require('validator')

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = '364d'

const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET {
        expiresIn: JWT_EXPIRES_IN
    })
}

const register = async (req, res) => {
    try{
        const {name, email, password } = req.body

        if(!name || !email || !password){
            return res.status(200).json({message: 'Please, provide a name, an email and a password'})
        }

        const isPasswordOk = validator.isStrongPassword(password, {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })

        if(!isPasswordOk) {
            return res.status(400).json({message: 'Password must have 1 lower, 1 upper, 1 number and 1 symbol and must be at least 6 charcters long'})
        }

        const isEmailOk = validator.isEmail(email)

        if(!isEmail){
            return res.status(400).json({message: 'You must provide a valide email'})
        }

        const existingUser =  await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message: 'Email already use'})
        }

        const user = await User.create({
            name,
            email,
            password
        })

        const token = generateToken(user.id)

        res.status(201).json({
            message: 'User registered successfuly',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (err) {
        res.status(500).json({message: 'Server error during registration', error: err.message})
    }
}