const pg = require('pg')

const pool = new Pool({
    connectionString : process.env.SUPABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

pool.on('error', (err) => {
    console.error('Unexpected error on idle PostgreSQL client', err)
    process.exit(-1)
})

const connectDB = async () => {
    try {
        const client = await pool.connect()
        console.log('Database connection established succesfully')
        client.release()
    } catch (err) {
        console.error('Unable to connect to the database:', err.message)
        process.exit(1)
    }
}
    

module.exports = {pool, connectDB}