import express, { Router } from 'express'
import {
	createEvent,
	deleteEvent,
	updateEvent,
	viewEvent,
} from '../controllers/event.controller'
import isAuthorized from '../middlewares/auth.middleware'
import { validateEvent } from '../middlewares/validate.middleware'

const router: Router = express.Router()

router.post('/create', validateEvent, isAuthorized, createEvent)

router.get('/', viewEvent)

router.put('/update', validateEvent, isAuthorized, updateEvent)

router.delete('/delete', isAuthorized, deleteEvent)

export default router
