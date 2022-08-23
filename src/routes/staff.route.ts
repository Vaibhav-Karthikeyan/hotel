import express, { Router } from 'express'
import {
	assignStaff,
	createStaff,
	deleteStaff,
	fetchServices,
	updateStaff,
	viewStaff,
} from '../controllers/staff.controller'
import isAuthorized from '../middlewares/auth.middleware'
import { validateStaff } from '../middlewares/validate.middleware'

const router: Router = express.Router()

router.post('/create', validateStaff, isAuthorized, createStaff)

router.get('/', isAuthorized, viewStaff)

router.put('/update', validateStaff, isAuthorized, updateStaff)

router.delete('/delete', isAuthorized, deleteStaff)

router.post('/assign', isAuthorized, assignStaff)

router.get('/active', fetchServices)

export default router
