import { Request, Response } from 'express'
import { hash as createHash, genSalt, compare } from 'bcryptjs'
import { getRepository } from 'typeorm'
import createAccessToken from '../utils/tokens.utils'
import { Login, Manager } from '../models/Manager'

export const registerManager = async (req: Request, res: Response) => {
	const { email, password, firstName, lastName } = req.body
	const existing = await getRepository(Login).findOne(email)

	if (existing)
		return res.json({ status: 'error', message: 'user already exists' })

	const saltRounds = 10
	const salt = await genSalt(saltRounds)
	const hash = await createHash(password, salt)
	const manager = await getRepository(Manager).save({
		firstName,
		lastName,
	})
	const _ = await getRepository(Login).save({
		email,
		password: hash,
		manID: manager.manID,
	})

	const accessToken = createAccessToken(
		manager.manID,
		process.env.JWT_ACCESS_SECRET,
		'1d'
	)

	return res.json({
		status: 'success',
		message: `manager created with email ${email}`,
		token: accessToken,
	})
}

export const loginManager = async (req: Request, res: Response) => {
	const { email, password } = req.body
	const manager = await getRepository(Login).findOne(email)

	let valid
	if (manager) valid = await compare(password, manager.password)
	if (!manager || !valid)
		return res.json({
			status: 'error',
			message: 'invalid email or password provided',
		})

	const relatedManager = manager.manID
	const accessToken = createAccessToken(
		relatedManager['manID'],
		process.env.JWT_ACCESS_SECRET,
		'1d'
	)

	return res.json({
		status: 'success',
		message: 'successful login',
		token: accessToken,
	})
}
