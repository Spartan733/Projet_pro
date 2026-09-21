const pool = require('../config/db')

const createConvention = async ({name, city, location, description, date}) => {
    const result = await pool.query(
        `INSERT INTO conventions (name, city, location, description, date)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [name.trim(), city.trim(), location.trim(), description || null, date]
    )
    return result.rows[0]
}

const getConventions = async () => {
    const result = await pool.query('SELECT * FROM conventions ORDER BY date ASC')
    return result.rows
}

const getConventionById = async (id) => {
    const result = await pool.query('SELECT * FROM conventions WHERE id = $1', [id])
    return result.rows[0] || null
}

const deleteConvention = async (id) => {
    const result = await pool.query('DELETE * FROM conventions WHERE id = $1 RETURNING id', [id])
    return result.rowcount > 0
}

module.exports = { createConvention, getConventions, getConventionById, updateConvention, deleteConvention }