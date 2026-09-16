const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

describe('User Model', () => {
    test('should create a valid user', () => {
        const user = new User({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123'
        })

        const error = user.validateSync()

        expect(error).toBeUndefined()
        expect(user.name).toBe('John Doe')
        expect(user.email).toBe('john@example.com')
        expect(user.role).toBe('user')
    })

    test('should require a name', () => {
        const user = new User({
            email: 'john@example.com',
            password: 'password123'
        })

        const error = user.validateSync()

        expect(error.errors.name).toBeDefined()
        expect(error.errors.name.message).toBe('Name is required')
    })

    test('should require an email', () => {
        const user = new User({
            name: 'John Doe',
            password: 'password123'
        })

        const error = user.validateSync()

        expect(error.errors.email).toBeDefined()
        expect(error.errors.email.message).toBe('Email is required')
    })

    test('should require a password', () => {
        const user = new User({
            name: 'John Doe',
            email: 'john@example.com'
        })

        const error = user.validateSync()

        expect(error.errors.password).toBeDefined()
        expect(error.errors.password.message).toBe('Password is required')
    })

    test('should convert email to lowercase', () => {
        const user = new User({
            name: 'John Doe',
            email: 'JOHN@EXAMPLE.COM',
            password: 'password123'
        })

        expect(user.email).toBe('john@example.com')
    })

    test('should trim the name', () => {
        const user = new User({
            name: '   John Doe   ',
            email: 'john@example.com',
            password: 'password123'
        })

        expect(user.name).toBe('John Doe')
    })

    test('should use "user" as the default role', () => {
        const user = new User({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123'
        })

        expect(user.role).toBe('user')
    })

    test('should accept valid roles', () => {
        const roles = ['admin', 'user', 'owner']

        roles.forEach(role => {
            const user = new User({
                name: 'John Doe',
                email: `john-${role}@example.com`,
                password: 'password123',
                role
            })

            const error = user.validateSync()

            expect(error).toBeUndefined()
        })
    })

    test('should hash the password before saving', async () => {
        const user = new User({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123'
        })

        const originalPassword = user.password

        await user.save()

        expect(user.password).not.toBe(originalPassword)

        const isValid = await bcrypt.compare(
            originalPassword,
            user.password
        )

        expect(isValid).toBe(true)
    })

    test('should compare the password correctly', async () => {
        const user = new User({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123'
        })

        await user.save()

        const result = await user.comparePassword('password123')

        expect(result).toBe(true)
    })

    test('should reject an incorrect password', async () => {
        const user = new User({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123'
        })

        await user.save()

        const result = await user.comparePassword('wrong-password')

        expect(result).toBe(false)
    })
})