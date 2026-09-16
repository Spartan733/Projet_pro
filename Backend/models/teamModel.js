const { pool } = require('../config/db')

const createTeam = async ({})

const Team = sequelize.define(
    "Team",
    {
        name: {
            type: String,
            required: [true, 'Team name is required'],
            trim: true
        },
        owner: {
            type: String,
            ref: 'user',
            required: true
        },
        members: [
            {
                type: sequelize.Schema.Types.ObjectId,
                ref: 'user'
            } 
        ]
            
    },
    {
        timestamps: true
    }
)

module.exports = sequelize.model('Team', teamSchema)