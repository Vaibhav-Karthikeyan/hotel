import { Request, Response, NextFunction } from 'express'

// Route not found
const notFound = (req: Request, res: Response, next: NextFunction) => {
	const error = new Error(`Not Found: ${req.originalUrl} route does not exist`)
	const newError = { code: 1000, message: error.message }
	res.status(404)
	next(newError)
}

// Error middleware
const errorMiddleware = (error, _: Request, res: Response) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode
	res
		.status(statusCode)
		.json({ status: 'error', code: error.code, message: error.message })
}

export { notFound, errorMiddleware }
