import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { AllottedRoom, Booking, Customer } from '../models/Customer'
import { Room } from '../models/Room'

export const createBooking = async (req: Request, res: Response) => {
	const {
		firstName,
		lastName,
		arrivalDate,
		departureDate,
		occupancy,
	} = req.body

	const { custID } = await getRepository(Customer).save({ firstName, lastName })
	await getRepository(Booking).save({
		custID,
		arrivalDate,
		departureDate,
		occupancy,
		status: false,
	})

	return res.json({
		status: 'success',
		message: 'customer booking completed',
		custID,
	})
}

export const getStatus = async (req: Request, res: Response) => {
	const { custID } = req.query
	if (!custID)
		return res
			.status(400)
			.json({ status: 'error', message: 'custID not provided' })

	let bookingDetails
	try {
		bookingDetails = await getRepository(Booking).findOne(custID.toString())
	} catch (err) {
		return res.status(400).json({
			status: 'error',
			message: 'invalid custID provided',
		})
	}
	if (!bookingDetails)
		return res
			.status(400)
			.json({ status: 'error', message: 'customer booking not found' })
	const custDetails = await getRepository(Customer).findOne(custID.toString())

	return res.json({
		status: 'success',
		message: 'status fetch successful',
		bookingDetails,
		custDetails,
	})
}

export const allotRoom = async (req: Request, res: Response) => {
	const { roomNo, custID, status } = req.query
	const { manID } = res.locals

	if (!roomNo || !custID || typeof status === 'undefined')
		return res
			.status(400)
			.json({ status: 'error', message: 'all parameters not supplied' })

	let room
	let customer
	try {
		room = await getRepository(Room).findOne(roomNo.toString())
		customer = await getRepository(Customer).findOne(custID.toString())
	} catch (err) {
		return res.status(500).json({ status: 'error', message: err.message })
	}

	if (!room || !customer)
		return res
			.status(400)
			.json({ status: 'error', message: 'room or customer not found' })

	const alreadyBooked = await getRepository(AllottedRoom).findOne(
		roomNo.toString()
	)

	if (alreadyBooked)
		return res
			.status(400)
			.json({ status: 'error', message: 'room already booked' })

	const cID = customer.custID
	const rNo = room.roomNo
	if (!status) {
		await getRepository(AllottedRoom).delete(roomNo.toString())
		const booking = await getRepository(Booking).findOne(custID.toString())
		booking.status = true
		await getRepository(Booking).save(booking)
		return res.json({ status: 'success', message: 'booking cancelled' })
	}

	await getRepository(AllottedRoom).save({ roomNo: rNo, custID: cID, manID })
	const booking = await getRepository(Booking).findOne(custID.toString())
	booking.status = true
	await getRepository(Booking).save(booking)
	return res.json({ status: 'success', message: 'booking accepted' })
}

export const viewBookings = async (req: Request, res: Response) => {
	const customers = await getRepository(Customer).find()
	const bookings = await getRepository(Booking).find()
	const allotted = await getRepository(AllottedRoom).find()

	return res.json({
		status: 'success',
		message: 'fetch successful',
		customers,
		bookings,
		allotted,
	})
}
