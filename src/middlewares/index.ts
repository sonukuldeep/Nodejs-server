import express from 'express'
import { get, merge } from 'lodash'
import 'dotenv/config'

import { getUserBySessionToken } from '../db/users'

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params
        const currentUserId: string = get(req, 'identity._id')
        
        if (!currentUserId) {
            console.log('unauthorized')
            return res.sendStatus(403)
        }

        if (currentUserId.toString() !== id) {
            console.log('unauthorized')
            return res.sendStatus(403)
        }

        next()

    } catch (error) {
        console.error(error.message)
        return res.sendStatus(400)
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies[process.env.COOKIETITLE]

        if (!sessionToken) {
            console.log('unauthorized')
            return res.sendStatus(403)
        }

        const existingUser = await getUserBySessionToken(sessionToken)
        if (!existingUser) {
            console.log('unauthorized')
            return res.sendStatus(403)
        }

        merge(req, { identity: existingUser })
        return next()

    } catch (error) {
        console.error(error.message)
        return res.sendStatus(400)
    }
}