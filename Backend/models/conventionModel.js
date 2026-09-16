const pool = require('../config/db')

const createConvention = async ({name, city, location, description, date}) => {
    const result = await pool.query(
        `INSERT INTO conventions (name, city, location, description, date)
        VALUES ($1, $2, $3, *4, $5)
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

const updateConvention = async (id, fields) => {
    const allowedFields = ['name', 'city', 'location', 'description', 'date']
    const setClauses = []
    const values = []
    let i = 1

    for (const key of allowedFields) {
        if (fields[key] !== undefined) {
            setClauses.push(`${key} = $${i}`)
            values.push(typeof fields[key] === 'string' ? fields[key].trim() : fields[key])
            i++
        }
    }

    if (setClauses.length === 0) {
        return getConventionById(id)
    }

    setClauses.push('update_at = NOW()')
    values.push(id)

    const result = await pool.query(
        `UPDATE conventions SET ${setClauses.join(', ')} WHERE id = $${i} RETURNING *`,
        values
    )
    return result.rows[0] || null
}

const deletConvention = async (id) => {
    const result = await pool.query('DELETE * FROM conventions WHERE id = $1 RETURNING id', [id])
    return result.rowcount > 0
}

module.exports = { createConvention, getConventions, getConventionById, updateConvention, deleteConvention }