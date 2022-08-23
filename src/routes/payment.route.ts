import express, { Router } from 'express'
import {
	checkPayment,
	createDue,
	viewPayments,
} from '../controllers/payment.controller'
import isAuthorized from '../middlewares/auth.middleware'
import { validatePayment } from '../middlewares/validate.middleware'

const router: Router = express.Router()

router.post('/create', validatePayment, isAuthorized, createDue)

router.get('/check', checkPayment)

router.get('/view', isAuthorized, viewPayments)

export default router
