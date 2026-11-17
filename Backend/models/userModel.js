const { pool } = require('../config/db')
const bcrypt = require('bcryptjs')

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


const updateUser = async (
  id,
  { name, email, city, description, avatar_url }
) => {
  const result = await pool.query(
    `UPDATE users SET username = $1, email = $2, city_user = $3, description_user = $4, avatar_url = $5 WHERE id = $6 RETURNING id, username, email, role, city_user AS city, description_user AS description, avatar_url`,
    [ name, email, city, description, avatar_url, id ]
  );

  return result.rows[0] || null;
};


module.exports = { findUserByEmail, findUserById, createUser, updateUser }