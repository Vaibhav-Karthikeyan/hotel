import { NextFunction, Request, Response } from 'express'
import {
	registerInput,
	loginInput,
	staffInput,
	eventInput,
	roomInput,
	bookingInput,
	paymentInput,
} from '../utils/joi-config.utils'

export const validateManager = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		if (registerInput.validate(req.body).error)
			throw new Error('Invalid user parameters')
	} catch (err) {
		return res.status(400).json({ status: 'error', message: err.message })
	}
	return next()
}

export const validateLogin = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		if (loginInput.validate(req.body).error)
			throw new Error('Invalid user parameters')
	} catch (err) {
		return res.status(400).json({ status: 'error', message: err.message })
	}
	return next()
}

export const validateStaff = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		if (staffInput.validate(req.body).error)
			throw new Error('Invalid staff parameters')
	} catch (err) {
		return res.status(400).json({ status: 'error', message: err.message })
	}
	return next()
}

export const validateEvent = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		if (eventInput.validate(req.body).error)
			throw new Error('Invalid event parameters')
	} catch (err) {
		return res.status(400).json({ status: 'error', message: err.message })
	}
	return next()
}

export const validateRoom = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		if (roomInput.validate(req.body).error)
			throw new Error('Invalid room parameters')
	} catch (err) {
		return res.status(400).json({ status: 'error', message: err.message })
	}
	return next()
}

export const validateBooking = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		if (bookingInput.validate(req.body).error)
			throw new Error('Invalid booking parameters')
	} catch (err) {
		return res.status(400).json({ status: 'error', message: err.message })
	}
	return next()
}

export const validatePayment = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		if (paymentInput.validate(req.body).error)
			throw new Error('Invalid payment parameters')
	} catch (err) {
		return res.status(400).json({ status: 'error', message: err.message })
	}
	return next()
}
