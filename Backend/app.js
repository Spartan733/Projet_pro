const express = require('express')
const app = express()
const cors =  require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const port = 3000

require('dotenv').config
require('./config/db')
const { sequelize, connectDB } =  require('./config/db')

const limiter = rateLimit({
    windowsMs: 15 * 60 * 1000,
    limit: 100,
    message: {status: 429, error: 'Too many requests; please try again later.'}
})

const startServer = async () => {
    await connectDB()

    await sequelize.sync({alter: false})
    console.log('Tables synchronized')
}

//Import des routes


app.use(
    helmet({
        contentSecurityPolicy: false,
        crossOriginResourcePolicy: { polycy: "cross-origin" }
    })
)

app.use(express.json())
const corsOption = {
    origin: 'https://localhost:3000'
}
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