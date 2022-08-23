import express, { Router } from 'express'
import {
	createRoom,
	deleteRoom,
	requestClean,
	viewRooms,
} from '../controllers/room.controller'
import isAuthorized from '../middlewares/auth.middleware'
import { validateRoom } from '../middlewares/validate.middleware'

const router: Router = express.Router()

router.post('/create', validateRoom, isAuthorized, createRoom)

router.get('/', viewRooms)

router.put('/clean', requestClean)

router.delete('/delete', isAuthorized, deleteRoom)

export default router
