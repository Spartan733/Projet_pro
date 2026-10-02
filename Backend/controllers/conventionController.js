const Convention = require('../models/conventionModel')
const { createConvention, getAllConventions, getOneConvention, updateOneConvention, deleteOneConvention } = require('../models/conventionModel')


const addConvention = async (req, res) => {
    try {
        const { name, city, location, description, date_start, date_end } = req.body

        if(!name || !city || !location || !date_start || !date_end){
            return res.status(400).json({ message: 'Name, City, Location and date are required'})
        }


        // convertir format date : dd/mm/aaaa en mm/dd/aaaa
        const convention = await createConvention({
            name,
            city,
            location,
            description,
            date_start,
            date_end
        })

        return res.status(201).json({ 
            message: 'Convention created successfully',
            convention
        })

    } catch (err) {
        return res.status(500).json({ message: 'Server error while creating convention', error: err.message})
    }
}

const getConventions = async (req, res) => {
    try {
        const conventions = await getAllConventions()

        return res.status(200).json(conventions)
    } catch (err) {
        return res.status(500).json({ message: 'Server error while fetching conventions', error: err.message})
    }
}

const getConventionById = async (req, res) => {
    try{
        const { id } = req.params

        const convention = await getOneConvention(id)

        if(!convention){
            return res.status(404).json({message: 'Convention not found'})
        }

        return res.status(200).json(convention)

    } catch (err) {
        return res.status(500).json({ message: 'Server error while fetching convention', error: err.message})
    }
}

const updateConvention = async (req, res) => {
    try {
        const { id } = req.params
        const { name, city, location, description, date_start, date_end } = req.body
        
        const convention = await getOneConvention(id)
        if (!convention) {
            return res.status(404).json({ message: 'Convention not found'})
        }

        const updatedConvention = await updateOneConvention(id, name, city, location, description, date_start, date_end)

        return res.status(200).json({ message: 'Convention updated successfully',convention: updatedConvention})

    } catch (err) {
        return res.status(500).json({ message: 'Server error while updating convention', error: err.message })
    }
}

const deleteConvention = async (req, res) => {
    try{
        const { id } = req.params
        
        const convention = await getOneConvention(id)
        if(!convention){
            return res.status(404).json({ message: 'Convention not found'})
        }

        await deleteOneConvention(id)

        return res.status(200).json({ message: 'Convention deleted successfully'})

    } catch (err) {
        return res.status(500).json({ message: 'Server error while deleting convention', error: err.message})
    }
}

module.exports = { addConvention, getConventions, getConventionById, updateConvention, deleteConvention}