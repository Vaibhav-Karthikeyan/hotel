import express, { Router } from 'express'
import {
	allotRoom,
	createBooking,
	getStatus,
	viewBookings,
} from '../controllers/customer.controller'
import isAuthorized from '../middlewares/auth.middleware'
import {
	validateBooking,
	validateStaff,
} from '../middlewares/validate.middleware'

const router: Router = express.Router()

router.post('/book', validateBooking, createBooking)

router.get('/status', getStatus)

router.put('/allot', isAuthorized, allotRoom)

router.get('/bookings', isAuthorized, viewBookings)

export default router
