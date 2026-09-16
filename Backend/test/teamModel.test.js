const sequelize = require('sequelize')
const Team = require('../models/teamModel')

describe('Team Model', () => {
    test('should create a valid team', () => {
        const team = new Team({
            name: 'Team Alpha',
            owner: new mongoose.Types.ObjectId(),
            members: []
        })

        const error = team.validateSync()

        expect(error).toBeUndefined()
        expect(team.name).toBe('Team Alpha')
        expect(team.members).toEqual([])
    })

    test('should require a team name', () => {
        const team = new Team({
            owner: new mongoose.Types.ObjectId()
        })

        const error = team.validateSync()

        expect(error.errors.name).toBeDefined()
        expect(error.errors.name.message).toBe('Team name is required')
    })

    test('should require an owner', () => {
        const team = new Team({
            name: 'Team Alpha'
        })

        const error = team.validateSync()

        expect(error.errors.owner).toBeDefined()
    })

    test('should trim the team name', () => {
        const team = new Team({
            name: '   Team Alpha   ',
            owner: new mongoose.Types.ObjectId()
        })

        expect(team.name).toBe('Team Alpha')
    })

    test('should accept members as ObjectIds', () => {
        const member1 = new mongoose.Types.ObjectId()
        const member2 = new mongoose.Types.ObjectId()

        const team = new Team({
            name: 'Team Alpha',
            owner: new mongoose.Types.ObjectId(),
            members: [member1, member2]
        })

        const error = team.validateSync()

        expect(error).toBeUndefined()
        expect(team.members).toHaveLength(2)
        expect(team.members[0]).toEqual(member1)
        expect(team.members[1]).toEqual(member2)
    })

    test('should automatically have timestamps', () => {
        const team = new Team({
            name: 'Team Alpha',
            owner: new mongoose.Types.ObjectId()
        })

        expect(team.schema.options.timestamps).toBe(true)
    })
})