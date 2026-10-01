const { pool } = require('../config/db')

const findUserByEmail = async (email) => {
    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    )

    return result.rows[0] || null
}

const findUserById = async (id) => {
    const result = await pool.query(
        'SELECT * FROM users WHERE id = $1',
        [id]
    )

    return result.rows[0] || null
}

const createUser = async ({ name, email, password }) => {
    const result = await pool.query(
        `
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, username, email
        `,
        [name, email, password]
    )

    return result.rows[0]
}

module.exports = { findUserByEmail, findUserById, createUser }