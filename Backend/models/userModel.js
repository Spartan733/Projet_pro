const { pool } = require('../config/db')
const bcrypt = require('bcryptjs')

const findUserByEmail = async (email) => {
    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    )
    console.log(email)
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
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const result = await pool.query(
        `
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, username, email
        `,
        [name, email, hashPassword]
    )

    return result.rows[0]
}

module.exports = { findUserByEmail, findUserById, createUser }