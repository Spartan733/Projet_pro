const express = require('express')
const app = express()
const port = 3000
const cors =  require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const path = require('path')

require('dotenv').config
require('./config/db')

//Import des routes
const userRoutes = require('./routes/userRoutes')
const teamRoutes = require('./routes/teamRoutes')
const conventionRoutes = require('./routes/conventionRoutes')

const corsOption = {
    origin: ['http://']
}

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: {status: 429, error: 'Too many requests; please try again later.'}
})

const startServer = async () => {
    // await connectDB()

    await sequelize.sync({alter: false})
    console.log('Tables synchronized')
}


app.use(
    helmet({
        contentSecurityPolicy: false,
        crossOriginResourcePolicy: { polycy: "cross-origin" }
    })
)

app.use(express.json())
app.use(cors(corsOption))
app.use(limiter)

//Monte le routeur sur le chemin de base

//Démarrage du serveur
startServer()
app.get('/', (req, res) => {
    res.send('Welcome to Jura..TsunaCrew')
})

app.listen(port, () => {
    console.log(`Serveur démaré sur http://localohost:${port}`)
})