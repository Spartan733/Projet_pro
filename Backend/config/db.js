const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.SUPABASE_URL)

const connectDB = async () => {
    try{
        await sequelize.authenticate()
        console.log('Connection has been established succesfully')
    } catch (err) {
        console.error('Unable to connect to the database', err)
    }
}

module.exports = {sequelize, connectDB}