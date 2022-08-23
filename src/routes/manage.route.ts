import express, { Router } from 'express'


// Controllers
import {
	loginManager,
	registerManager,
} from '../controllers/manager.controller'
import { validateLogin, validateManager } from '../middlewares/validate.middleware'

const router: Router = express.Router()

router.post('/register', validateManager, registerManager)

router.post('/login', validateLogin, loginManager)

export default router
