const jwt = require('jsonwebtoken')
const { findUserByEmail, createUser } = require('../models/userModel')
const validator = require('validator')

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = '364d'

const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    })
}

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please, provide a name, an email and a password' })
        }

        const isPasswordOk = validator.isStrongPassword(password, {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })

        if (!isPasswordOk) {
            return res.status(400).json({ message: 'Password must have 1 lower, 1 upper, 1 number and 1 symbol and must be at least 6 characters long' })
        }

        const isEmailOk = validator.isEmail(email)

        if (!isEmailOk) {
            return res.status(400).json({ message: 'You must provide a valid email' })
        }

        const existingUser = await findUserByEmail(email)
        if (existingUser) {
            return res.status(400).json({ message: 'Email already used' })
        }

        const user = await createUser({ name, email, password })

        const token = generateToken(user.id)

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user.id,
                name: user.username,
                email: user.email
            }
        })

    } catch (err) {
        res.status(500).json({ message: 'Server error during registration', error: err.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({message: 'Invalid username or password'})
        }
        
        // Get user from token payload
        const user = await User.findOne({ email }).select('+password')
        if(!user){
            return res.status(401).json({ message: 'Invalid credentials'})
        }

        //Verifie if password is match
        const isMatch = await user.comparePassword(password)
        if(!isMatch){
            return res.status(401).json({ message: 'Invalid credentials'})
        }

        const token =  generateToken(user._id)

        res.status(200).json({
            message: 'Login succesfully',
            token,
            user: {
                id: user.id,
                name: user.username,
                email: user.email,
                role: user.role
            }
        })

    } catch (err) {
        res.status(500).json({ message : 'Error during connection', error: err.message})
    }
}

module.exports = { register, generateToken, login }