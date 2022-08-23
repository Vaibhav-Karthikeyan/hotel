import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Event, EventManager } from '../models/Event'

export const createEvent = async (req: Request, res: Response) => {
	const { eventName, date } = req.body
	const { manID } = res.locals

	const { eventID } = await getRepository(Event).save({ eventName, date })

	await getRepository(EventManager).save({
		eventID,
		manID,
	})

	return res.json({ status: 'success', message: 'event successfully created' })
}

export const viewEvent = async (_: Request, res: Response) => {
	const events = await getRepository(Event).find()
	return res.json({
		status: 'success',
		message: 'event fetch successful',
		events,
	})
}

export const updateEvent = async (req: Request, res: Response) => {
	const { eventName, date } = req.body
	const { eventID } = req.query
	const { manID } = res.locals

	let event
	try {
		event = await getRepository(Event).findOne(eventID.toString())
	} catch (err) {
		return res.status(400).json({ status: 'error', message: err.message })
	}

	if (!event)
		return res.status(400).json({ status: 'error', message: 'event not found' })

	event.eventName = eventName
	event.date = date
	await getRepository(Event).save(event)

	let eventManager
	try {
		eventManager = await getRepository(EventManager).findOne(eventID.toString())
	} catch (err) {
		return res.status(400).json({ status: 'error', message: err.message })
	}

	eventManager.manID = manID
	await getRepository(EventManager).save(eventManager)

	return res.json({ status: 'success', message: 'event updated successfully' })
}

export const deleteEvent = async (req: Request, res: Response) => {
	const { eventID } = req.query
	let event
	try {
		event = await getRepository(Event).findOne(eventID.toString())
	} catch (err) {
		return res.status(400).json({ status: 'error', message: err.message })
	}
	if (!event)
		return res
			.status(400)
			.json({ status: 'error', message: 'event does not exist' })

	await getRepository(EventManager).delete(eventID.toString())
	await getRepository(Event).delete(eventID.toString())

	return res.json({ status: 'success', message: 'event deleted' })
}
