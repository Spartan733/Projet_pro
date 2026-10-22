const team = require('../models/teamModel')
const { createTeam } = require('../models/teamModel')

const addTeam = async (req, res) => {
    try {
        const { name, description, maxMembers, conventionId} = req.body
        const user = req.user

        if(!name || !description || !maxMembers || !conventionId){
            return res.status(400).json({ message: 'Name, description and maximum number of members are required'})
        }
        
        
        // convertir format date : dd/mm/aaaa en mm/dd/aaaa
        const team = await createTeam({
            name,
            description,
            ownerId : user.id,
            conventionId,
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

const getTeams = async (req, res) => {
    try{
        const teams = await team.findAllTeams()

        return res.status(200).json(teams)
    } catch (err) {
        return res.status(500).json({ message: 'Server error while fetching teams', error: err.message})
    }

}

const getTeamsById = async (req, res) => {
    try{
        const { id } = req.params
        const teams = await team.findTeamById(id)

        if(!team){
            return res.status(404).json({message: 'team not found'})
        }
        return res.status(200).json(teams)

    } catch (err) {
        return res.status(500).json({ message: 'Server error while fetching team', error: err.message})
    }
}

const updateTeam = async (req, res) => {
    try {
        const { id } = req.params

        const {name, description, conventionId, maxMembers} = req.body

        const teams = await team.findTeamById(id)
       

        if(!teams){
            return res.status(404).json({message: 'Team not found'})
        }

        const updatedTeam = await team.updateTeam(id, name, description, conventionId, maxMembers)

        return res.status(200).json({ message: 'Team updated successfully', convention: updatedTeam})

    } catch (err) {
        return res.status(500).json({ message: 'Server error while updating team', error: err.message})
    }
}

const deleteTeam = async (req, res) => {
    try{
        const { id } = req.params
        
        const teams = await team.findTeamById(id)
        if(!teams){
            return res.status(404).json({ message: 'Teams not found'})
        }

        await deleteTeam(id)

        return res.status(200).json({ message: 'Team deleted successfully'})

    } catch (err) {
        return res.status(500).json({ message: 'Server error while deleting convention', error: err.message})
    }
}

module.exports = { addTeam, getTeams, getTeamsById, updateTeam, deleteTeam } 