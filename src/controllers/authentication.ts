import express from 'express'
import { createUser, getUserByEmail } from '../db/users'
import { authentication, random } from '../helpers'
import 'dotenv/config'

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            console.log('email or password is empty')
            return res.sendStatus(400)
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password')

        if (!user) {
            console.log('user doesn\'t exist')
            return res.sendStatus(400)
        }

        const expectedHash = authentication(user.authentication.salt, password)

        if (user.authentication.password !== expectedHash) {
            console.log('unauthorized')
            return res.sendStatus(403)
        }

        const salt = random()

        user.authentication.sessionToken = authentication(salt, user._id.toString())
        await user.save()

        const maxAge = Number(process.env.COOKIEEXPIRESIN) || 60 * 60 * 1000
        const cookieTitle = process.env.COOKIETITLE || "donald duck"
        res.cookie(cookieTitle, user.authentication.sessionToken, { domain: 'localhost', path: '/', maxAge })

        return res.status(200).end()
        // return res.status(200).json(user).end()

    } catch (error) {
        console.error(error.message)
        return res.sendStatus(400)
    }
}

export const logout = async (req: express.Request, res: express.Response) => {
    try {

        res.cookie(process.env.COOKIETITLE, null, { domain: 'localhost', path: '/' })

        return res.status(200).end()
        // return res.status(200).json(user).end()
    } catch (error) {
        console.error(error.message)
        return res.sendStatus(400)
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body

        if (!email || !password || !username) {
            console.log('enter all fields')
            return res.sendStatus(400)
        }
        const existingUser = await getUserByEmail(email)

        if (existingUser) {
            console.log('user exist')
            return res.sendStatus(400)
        }

        const salt = random()
        const user = await createUser({
            email, username, authentication: { salt, password: authentication(salt, password) }
        })

        return res.status(200).end()
        // return res.status(200).json(user).end()
    } catch (error) {
        console.error(error.message)
        return res.sendStatus(400)
    }
}

export const resetPassowrd = async (req: express.Request, res: express.Response) => {
    try {
        const { oldPassword, newPassword, email } = req.body

        if (!oldPassword || !newPassword || !email) {
            console.log('cannot update user password')
            return res.sendStatus(403)
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password')

        if (!user) {
            console.log('user doesn\'t exist')
            return res.sendStatus(400)
        }

        const expectedHash = authentication(user.authentication.salt, oldPassword)

        if (user.authentication.password !== expectedHash) {
            console.log('unauthorized')
            return res.sendStatus(403)
        }

        const newHash = authentication(user.authentication.salt, newPassword)
        user.authentication.password = newHash

        await user.save()

        res.cookie(process.env.COOKIETITLE, null, { domain: 'localhost', path: '/' })

        return res.status(200).end()

        // return res.status(200).json(user).end()

    } catch (error) {
        console.error(error.message)
        return res.sendStatus(400)
    }
}