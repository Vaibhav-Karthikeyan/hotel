import rateLimit, { RateLimit } from 'express-rate-limit'
import cookieParser from 'cookie-parser'
import express, { Express } from 'express'
import { createConnection } from 'typeorm'
import helmet from 'helmet'
import dotenv from 'dotenv'
import morgan from 'morgan'
import chalk from 'chalk'
import cors from 'cors'

// Routes
import manage from './routes/manage.route'
import staff from './routes/staff.route'
import event from './routes/event.route'
import room from './routes/room.route'
import customer from './routes/customer.route'
import payment from './routes/payment.route'

// Middlewares
import { notFound, errorMiddleware } from './middlewares/errors.middleware'

// Express initialisation
dotenv.config()
const port: string = process.env.PORT
const app: Express = express()
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(express.json({ limit: '10mb' }))
app.use(cookieParser())

// Basic Security
const limiter: RateLimit = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
})
app.use(helmet())
app.use(limiter)
app.use(morgan('common'))
app.use(cors({ origin: process.env.CORS_ORIGIN }))

// Database
createConnection().then((connection) => {
	connection.synchronize()
	console.info(chalk.green(`database connected on port 5432`))
})

// Routes
app.use('/manage', manage)
app.use('/staff', staff)
app.use('/event', event)
app.use('/room', room)
app.use('/customer', customer)
app.use('/payment', payment)

// Error Middlewares
app.use(notFound)
app.use(errorMiddleware)

app.listen(port, () =>
	console.info(chalk.blue(`server online on port ${port}`))
)
