import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Customer } from '../models/Customer'
import { Handler, Payment } from '../models/Payment'

export const createDue = async (req: Request, res: Response) => {
	const { dueDate, amount } = req.body
	const { manID } = res.locals
	const { custID } = req.query

	if (!custID)
		return res
			.status(400)
			.json({ status: 'error', message: 'custID not provided' })

	let customer
	try {
		customer = await getRepository(Customer).findOne(custID.toString())
	} catch (err) {
		return res.status(500).json({ status: 'error', message: err.message })
	}

	if (!customer)
		return res
			.status(400)
			.json({ status: 'error', message: 'customer not found' })

	const payment = await getRepository(Payment).findOne(custID.toString())
	if (payment)
		return res
			.status(400)
			.json({ status: 'error', message: 'customer already has a due' })

	const { paymentID } = await getRepository(Payment).save({
		custID: custID.toString(),
		dueDate,
		amount,
	})
	await getRepository(Handler).save({ manID, paymentID })
	return res.json({ status: 'success', message: 'amount added to customer' })
}

export const checkPayment = async (req: Request, res: Response) => {
	const { custID } = req.query

	if (!custID)
		return res
			.status(400)
			.json({ status: 'error', message: 'custID not provided' })

	let payment
	try {
		payment = await getRepository(Payment).findOne({
			custID: custID.toString(),
		})
	} catch (err) {
		return res.status(500).json({ status: 'error', message: err.message })
	}

	if (!payment)
		return res.status(400).json({
			status: 'error',
			message: 'customer does not have pending payment',
		})

	return res.json({
		status: 'success',
		message: 'successful payment fetch',
		payment,
	})
}

export const viewPayments = async (req: Request, res: Response) => {
	const payments = await getRepository(Payment).find()
	const handlers = await getRepository(Handler).find()

	return res.json({
		status: 'success',
		message: 'successful payments fetch',
		payments,
		handlers,
	})
}
