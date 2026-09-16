const { Sequelize, DataTypes } = require('sequelize')

// On recrée le modèle avec une base SQLite en mémoire pour tester
// les vraies validations Sequelize, sans dépendre d'une vraie DB.
// (nécessite : npm install --save-dev sqlite3)
let sequelize
let Convention

beforeAll(async () => {
    sequelize = new Sequelize('sqlite::memory:', { logging: false })

    Convention = sequelize.define(
        'Convention',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { notNull: { msg: 'Convention name is required' }, notEmpty: { msg: 'Convention name is required' } }
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { notNull: { msg: 'City name is required' }, notEmpty: { msg: 'City name is required' } }
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { notNull: { msg: 'Convention location is required' }, notEmpty: { msg: 'Convention location is required' } }
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: { notNull: { msg: 'Convention date is required' } }
            }
        },
        {
            timestamps: true,
            hooks: {
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

    await sequelize.sync()
})

afterEach(async () => {
    await Convention.destroy({ where: {}, truncate: true })
})

afterAll(async () => {
    await sequelize.close()
})

describe('Convention model', () => {
    const validData = {
        name: 'DevCon 2026',
        city: 'Lyon',
        location: 'Centre des congrès',
        date: new Date('2026-05-01')
    }

    test('crée une convention valide avec tous les champs requis', async () => {
        const convention = await Convention.create(validData)

        expect(convention.id).toBeDefined()
        expect(convention.name).toBe('DevCon 2026')
        expect(convention.description).toBeNull()
    })

    test('accepte une description optionnelle', async () => {
        const convention = await Convention.create({
            ...validData,
            description: 'Une super convention'
        })

        expect(convention.description).toBe('Une super convention')
    })

    test('rejette une convention sans name', async () => {
        const { name, ...data } = validData
        await expect(Convention.create(data)).rejects.toThrow()
    })

    test('rejette une convention sans city', async () => {
        const { city, ...data } = validData
        await expect(Convention.create(data)).rejects.toThrow()
    })

    test('rejette une convention sans location', async () => {
        const { location, ...data } = validData
        await expect(Convention.create(data)).rejects.toThrow()
    })

    test('rejette une convention sans date', async () => {
        const { date, ...data } = validData
        await expect(Convention.create(data)).rejects.toThrow()
    })

    test('rejette un name vide ou composé uniquement d\'espaces', async () => {
        await expect(
            Convention.create({ ...validData, name: '   ' })
        ).rejects.toThrow()
    })

    test('supprime les espaces en début/fin (trim) sur name, city, location', async () => {
        const convention = await Convention.create({
            ...validData,
            name: '  DevCon 2026  ',
            city: '  Lyon  ',
            location: '  Centre des congrès  '
        })

        expect(convention.name).toBe('DevCon 2026')
        expect(convention.city).toBe('Lyon')
        expect(convention.location).toBe('Centre des congrès')
    })

    test('renseigne automatiquement createdAt et updatedAt', async () => {
        const convention = await Convention.create(validData)

        expect(convention.createdAt).toBeInstanceOf(Date)
        expect(convention.updatedAt).toBeInstanceOf(Date)
    })
})