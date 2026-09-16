const { pool } = require('../config/db')

const findUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    return results.rows[0] || nill
}

const findUserById = async (id) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id])
    return result.rows[0] || null
}

const createUser = async ({ name, email, password }) => {
    const result = await pool.query(`
        INSERT INTO "users" (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, name, email, created_at, uptdate_at`,
        [name, email, password]
    )
    return result.rows[0]
}

module.exports = findUserByEmail, findUserById, createUser