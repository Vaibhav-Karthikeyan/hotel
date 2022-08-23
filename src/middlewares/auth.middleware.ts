import { verify } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Manager } from '../models/Manager'

const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
	const { authorization } = req.headers

	if (!authorization)
		return res.status(401).json({
			status: 'error',
			message: 'Unauthorized: invalid token provided',
		})

	if (authorization.split(' ')[0] !== 'Bearer')
		return res.status(401).json({
			status: 'error',
			message: 'Unauthorized: invalid token provided',
		})

	const token = authorization.split(' ')[1]
	if (!token) throw new Error('invalid headers provided')

	verify(token, process.env.JWT_ACCESS_SECRET, async (err, verifiedToken) => {
		if (err)
			return res.status(401).json({
				status: 'error',
				message: 'Unauthorized: invalid token provided',
			})

		const manager = await getRepository(Manager).findOne(verifiedToken.manID)

		if (!manager)
			return res.status(401).json({
				status: 'error',
				message: 'Unauthorized: invalid token provided',
			})

		res.locals = { manID: manager.manID }
		return next()
	})
	return null
}

export default isAuthorized
