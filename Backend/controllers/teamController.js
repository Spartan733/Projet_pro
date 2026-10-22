const team = require('../models/teamModel')
const { createTeam } = require('../models/teamModel')

const addTeam = async (req, res) => {
    try {
        const { name, description, maxMembers, convention_id} = req.body

        const user = req.user

        if(!name || !description || !maxMembers || !convention_id){
            return res.status(400).json({ message: 'Name, description and maximum number of members are required'})
        }
        
        
        // convertir format date : dd/mm/aaaa en mm/dd/aaaa
        const team = await createTeam({
            name,
            description,
            ownerId : user.id,
            convention_id : convention_id.id,
            maxMembers
        })

        
        return res.status(201).json({ 
            message: 'Team created successfully',
            team
        })

    } catch (err) {
        return res.status(500).json({ message: 'Server error while creating team', error: err.message})
    }
}

module.exports = { addTeam } 