const pg = require('pg')
const { Pool } = pg

exports.pool = new Pool({
    connectionString: process.env.SUPABASE_URL
})