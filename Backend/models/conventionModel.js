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
            setClauses.push(``)
        }
    }
}

const Convention = sequelize.define(
    'Convention',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Convention name is required' },
                notEmpty: { msg: 'Convention name is required' }
            }
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'City name is required' },
                notEmpty: { msg: 'City name is required' }
            }
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Convention location is required' },
                notEmpty: { msg: 'Convention location is required' }
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: { msg: 'Convention date is required' }
            }
        }
    },
    {
        timestamps: true,
        hooks: {
            // équivalent du "trim: true" de Mongoose, qui n'existe pas en Sequelize
            beforeValidate: (convention) => {
                ['name', 'city', 'location'].forEach((field) => {
                    if (typeof convention[field] === 'string') {
                        convention[field] = convention[field].trim()
                    }
                })
            }
        }
    }
)

module.exports = Convention