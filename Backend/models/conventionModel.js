const { DataTypes } = require('sequelize')
const sequelize = require('../config/db') 

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