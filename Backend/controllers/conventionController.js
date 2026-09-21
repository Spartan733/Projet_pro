const Convention = require('../models/conventionModel')
const { createConvention, getConventions, getConventionById, deleteConvention } = require('../models/conventionModel')

const create = async (req, res) => {
    try {
        const { name, city, location, description, date } = req.body

        if(!name || !city || !location || !date){
            return res.status(400).json({ message: 'Name, City, Location and date are required'})
        }

        const convention = await createConvention({
            name,
            city,
            location,
            description,
            date
        })

        return res.status(201).json({ 
            message: 'Convention created successfully',
            convention
        })

    } catch (err) {
        return res.status(500).json({ message: 'Server error while creating convention', error: err.message})
    }
}

const getAll = async (req, res) => {
    try {
        const conventions = await getConventions()

        return res.status(200).json(conventions)
    } catch (err) {
        return res.status(500).json({ message: 'Server error while fetching conventions', error: err.message})
    }
}

const getById = async (req, res) => {
    try{
        const { id } = req.params

        const convention = await getConventionById(id)

        if(!convention){
            return res.status(404).json({message: 'Convention not found'})
        }

        return res.status(200).json(convention)

    } catch (err) {
        return res.status(500).json({ message: 'Server error while fetching convention', error: err.message})
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params

        const convention = await getConventionById(id)

        if (!convention) {
            return res.status(404).json({ message: 'Convention not found'})
        }

        const updatedConvention = await updateConvention(id, req.body)

        return res.status(200).json({ message: 'Convention updated successfully',convention: updatedConvention})

    } catch (err) {
        return res.status(500).json({ message: 'Server error while updating convention', error: err.message })
    }
}

const remove = async (req, res) => {
    try{
        const { id } = req.params

        const convention = await getConventionById(id)

        if(!convention){
            return res.status(404).json({ message: 'Convention not found'})
        }

        await deleteConvention(id)

        return res.status(200).json({ message: 'Convention deleted successfully'})

    } catch (err) {
        return res.status(500).json({ message: 'Server error while deleting convention', error: err.message})
    }
}

module.exports = { create, getAll, getById, update, remove}