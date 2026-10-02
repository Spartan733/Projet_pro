const { pool } = require('../config/db')

const createConvention = async ({name, city, location, description, date_start, date_end}) => {
    const result = await pool.query(
        `INSERT INTO conventions (name, city, location, description, date_start, date_end)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
        [name.trim(), city.trim(), location.trim(), description || null, date_start, date_end]
    )
    return result.rows[0]
}

const getAllConventions = async () => {
    const result = await pool.query('SELECT * FROM conventions ORDER BY date_start ASC')
    return result.rows
}

const getOneConvention = async (id) => {
    const result = await pool.query('SELECT * FROM conventions WHERE id = $1', [id])
    return result.rows[0] || null
}

const deleteOneConvention = async (id) => {
    const result = await pool.query('DELETE * FROM conventions WHERE id = $1 RETURNING id', [id])
    return result.rowcount > 0
}

module.exports = { createConvention, getAllConventions, getOneConvention, deleteOneConvention }