const { pool } = require('../config/db')

// Créer une équipe
const createTeam = async ({
    name,
    description,
    ownerId,
    conventionId,
    maxMembers
}) => {
    const result = await pool.query(`
        INSERT INTO teams (
            name,
            description,
            owner_id,
            convention_id,
            max_members
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING
            id,
            name,
            description,
            owner_id,
            convention_id,
            max_members
    `, [
        name,
        description,
        ownerId,
        conventionId,
        maxMembers
    ])

    return result.rows[0]
}

// Afficher toute les équipes
const findAllTeams = async () => {
    const result = await pool.query(`
        SELECT
            t.id,
            t.name,
            t.description,
            t.owner_id,
            t.convention_id,
            t.max_members,
            u.username AS owner_username
        FROM teams t
        LEFT JOIN users u ON t.owner_id = u.id
        ORDER BY t.id
    `)

    return result.rows
}

// Trouver une équipe avec l'id de l'équipe
const findTeamById = async (id) => {
    const result = await pool.query(`
        SELECT
            t.id,
            t.name,
            t.description,
            t.owner_id,
            t.convention_id,
            t.max_members,
            u.username AS owner_username
        FROM teams t
        LEFT JOIN users u ON t.owner_id = u.id
        WHERE t.id = $1
    `, [id])

    return result.rows[0] || null
}

// Trouver une équipe avec l'id de l'user
const findTeamsByUserId = async (userId) => {
    const result = await pool.query(`
        SELECT
            t.id,
            t.name,
            t.description,
            t.owner_id,
            t.convention_id,
            t.max_members,
            tm.status
        FROM teams t
        INNER JOIN team_members tm ON t.id = tm.teams_id
        WHERE tm.users_id = $1
        ORDER BY t.id
    `, [userId])

    return result.rows
}

// Mise à jour d'une équipe
const updateTeam = async (
    id,
    {
        name,
        description,
        conventionId,
        maxMembers
    }
) => {
    const result = await pool.query(`
        UPDATE teams
        SET
            name = $1,
            description = $2,
            convention_id = $3,
            max_members = $4
        WHERE id = $5
        RETURNING
            id,
            name,
            description,
            owner_id,
            convention_id,
            max_members
    `, [
        name,
        description,
        conventionId,
        maxMembers,
        id
    ])

    return result.rows[0] || null
}

// Suppression d'une équipe
const deleteTeam = async (id) => {
    const result = await pool.query(
        'DELETE FROM teams WHERE id = $1 RETURNING id',
        [id]
    )

    return result.rows[0] || null
}

// Ajouter un membre à l'équipe
const addTeamMember = async (teamId, userId, status = 'Pending') => {
    const result = await pool.query(`
        INSERT INTO team_members (
            teams_id,
            users_id,
            status
        )
        VALUES ($1, $2, $3)
        RETURNING teams_id, users_id, status
    `, [
        teamId,
        userId,
        status
    ])

    return result.rows[0]
}

// Afficher les membres d'une équipe avec l'id de l'équipe
const findMembersTeamByUserId = async (teamId, userId) => {
    const result = await pool.query(`
        SELECT
            u.id,
            u.username,
            u.email,
            u.city_user,
            u.description_user,
            u.avatar_url,
            tm.status
        FROM team_members tm
        INNER JOIN users u ON tm.users_id = u.id
        WHERE tm.teams_id = $1
        ORDER BY u.username
    `, [teamId])

    return result.rows
}


module.exports = { createTeam, findAllTeams, findTeamById, findTeamsByUserId, updateTeam, deleteTeam, addTeamMember, findMembersTeamByUserId }