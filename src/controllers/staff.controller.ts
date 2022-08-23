import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Room } from '../models/Room'
import { AssignedManager, Cater, Staff } from '../models/Staff'

export const createStaff = async (req: Request, res: Response) => {
	const { firstName, lastName, contactNo } = req.body
	const { manID } = res.locals

	const staff = await getRepository(Staff).save({
		firstName,
		lastName,
		contactNo,
	})

	await getRepository(AssignedManager).save({
		staffID: staff.staffID,
		manID,
	})

	return res.json({ status: 'success', message: 'staff successfully created' })
}

export const viewStaff = async (_: Request, res: Response) => {
	const staff = await getRepository(Staff).find()
	return res.json({
		status: 'success',
		message: 'staff fetch successful',
		staff,
	})
}

export const updateStaff = async (req: Request, res: Response) => {
	const { firstName, lastName, contactNo } = req.body
	const { staffID } = req.query
	const { manID } = res.locals

	let staff
	try {
		staff = await getRepository(Staff).findOne(staffID.toString())
	} catch (err) {
		return res.status(400).json({ status: 'error', message: err.message })
	}

	if (!staff)
		return res.status(400).json({ status: 'error', message: 'staff not found' })

	staff.firstName = firstName
	staff.lastName = lastName
	staff.contactNo = contactNo

	await getRepository(Staff).save(staff)

	let assignedManager
	try {
		assignedManager = await getRepository(AssignedManager).findOne(
			staffID.toString()
		)
	} catch (err) {
		return res.status(400).json({ status: 'error', message: err.message })
	}

	assignedManager.manID = manID
	await getRepository(AssignedManager).save(assignedManager)

	return res.json({ status: 'success', message: 'staff updated successfully' })
}

export const deleteStaff = async (req: Request, res: Response) => {
	const { staffID } = req.query
	let staff
	try {
		staff = await getRepository(Staff).findOne(staffID.toString())
	} catch (err) {
		return res.status(400).json({ status: 'error', message: err.message })
	}
	if (!staff)
		return res
			.status(400)
			.json({ status: 'error', message: 'staff does not exist' })

	await getRepository(AssignedManager).delete(staffID.toString())
	await getRepository(Staff).delete(staffID.toString())

	return res.json({ status: 'success', message: 'staff deleted' })
}

export const assignStaff = async (req: Request, res: Response) => {
	const { roomNo, staffID } = req.body

	if (!roomNo)
		return res
			.status(400)
			.json({ status: 'error', message: 'all parameters not supplied' })

	let room
	try {
		room = await getRepository(Room).findOne(roomNo.toString())
	} catch (err) {
		return res.status(400).json({ status: 'error', message: err.message })
	}
	if (!room)
		return res.status(400).json({ status: 'error', message: 'room not found' })

	if (!staffID) {
		await getRepository(Cater).delete(roomNo.toString())
		return res.json({
			status: 'success',
			message: 'catering service removed',
		})
	}

	let staff
	try {
		staff = await getRepository(Staff).findOne(staffID.toString())
	} catch (err) {
		return res.status(400).json({ status: 'error', message: err.message })
	}
	if (!staff)
		return res.status(400).json({ status: 'error', message: 'staff not found' })

	await getRepository(Cater).save({ roomNo, staffID })
	return res.json({
		status: 'success',
		message: `catering added for room ${roomNo}`,
	})
}

export const fetchServices = async (_: Request, res: Response) => {
	const caters = await getRepository(Cater).find()
	return res.json({
		status: 'success',
		message: 'active service fetch successful',
		caters,
	})
}
