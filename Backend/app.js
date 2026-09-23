const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

require('dotenv').config()

// Connexion a la bdd
require('./config/db')

//Import des routes
const userRoutes = require('./routes/userRoutes')
const teamRoutes = require('./routes/teamRoutes')
const conventionRoutes = require('./routes/conventionRoutes')

const app = express()
const port = 3000

// Configuration Cors
const corsOption = {
    origin: 'http://localhost:3000'
}

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: {
        status: 429,
        error: 'Too many requests, please try again later.'
    }
})

app.use(
    helmet({
        contentSecurityPolicy: false,
        crossOriginResourcePolicy: {
            policy: 'cross-origin'
        }
    })
)

app.use(express.json())
app.use(cors(corsOption))
app.use(limiter)

// Routes
app.use('/users', userRoutes)
app.use('/teams', teamRoutes)
app.use('/conventions', conventionRoutes)

// Routes d'acceuil
app.get('/', (req, res) => {
    res.send('Welcome to Jura..TsunaCrew')
})

//Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`)
})
