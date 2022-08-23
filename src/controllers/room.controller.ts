import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { AllottedRoom } from '../models/Customer'
import { Cleaning, Room } from '../models/Room'
import { Cater } from '../models/Staff'

export const createRoom = async (req: Request, res: Response) => {
	const { roomNo, baseRate, roomType, occupancy } = req.body

	await getRepository(Room).save({ roomNo, baseRate, roomType, occupancy })
	await getRepository(Cleaning).save({
		roomNo,
		needsCleaning: false,
	})

	return res.json({ status: 'success', message: 'room successfully created' })
}

export const viewRooms = async (_: Request, res: Response) => {
	const rooms = await getRepository(Room).find()
	const cleaning = await getRepository(Cleaning).find()
	const allottedRooms = await getRepository(AllottedRoom).find()
	return res.json({
		status: 'success',
		message: 'room fetch successful',
		rooms,
		cleaning,
		allottedRooms,
	})
}

export const requestClean = async (req: Request, res: Response) => {
	const { needsCleaning } = req.body
	const { roomNo } = req.query

	if (typeof needsCleaning === 'undefined' || !roomNo)
		return res
			.status(400)
			.json({ status: 'error', message: 'all parameters not supplied' })

	let room
	try {
		room = await getRepository(Cleaning).findOne(roomNo.toString())
	} catch (err) {
		return res
			.status(400)
			.json({ status: 'error', message: 'invalid room no. provided' })
	}

	room.needsCleaning = needsCleaning
	await getRepository(Cleaning).save(room)

	if (needsCleaning === false)
		await getRepository(Cater).delete(roomNo.toString())

	return res.json({
		status: 'success',
		message: 'room clean status changed',
	})
}

export const deleteRoom = async (req: Request, res: Response) => {
	const { roomNo } = req.query
	let room
	try {
		room = await getRepository(Room).findOne(roomNo.toString())
	} catch (err) {
		return res.status(400).json({ status: 'error', message: err.message })
	}
	if (!room)
		return res.status(400).json({ status: 'error', message: 'room not found' })

	let caterService
	try {
		caterService = await getRepository(Cater).findOne(roomNo.toString())
	} catch (err) {
		return res.status(400).json({ status: 'error', message: err.message })
	}
	if (caterService) await getRepository(Cater).delete(roomNo.toString())

	await getRepository(Cleaning).delete(roomNo.toString())
	await getRepository(Room).delete(roomNo.toString())

	return res.json({ status: 'success', message: 'room deleted' })
}
