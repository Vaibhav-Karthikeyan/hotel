import Joi from 'joi'

export const options = {
	errors: {
		wrap: {
			label: '',
		},
	},
}

export const registerInput = Joi.object({
	email: Joi.string().min(5).max(100).email().required(),
	password: Joi.string().regex(
		/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!#.])[A-Za-z\d$@$!%*?&.]{8,20}/
	),
	firstName: Joi.string().min(2).max(30).required(),
	lastName: Joi.string().min(2).max(30).required(),
})

export const loginInput = Joi.object({
	email: Joi.string().min(5).max(100).email().required(),
	password: Joi.string().regex(
		/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!#.])[A-Za-z\d$@$!%*?&.]{8,20}/
	),
})

export const staffInput = Joi.object({
	firstName: Joi.string().min(2).max(30).required(),
	lastName: Joi.string().min(2).max(30).required(),
	contactNo: Joi.number().min(1000000000).max(9999999999).required(),
})

export const eventInput = Joi.object({
	eventName: Joi.string().min(2).max(30).required(),
	date: Joi.string()
		.regex(/^\d\d\d\d-\d\d-\d\d/)
		.required(),
})

export const roomInput = Joi.object({
	roomNo: Joi.number().min(100).max(999).required(),
	baseRate: Joi.number().min(1000).max(100000).required(),
	roomType: Joi.string().min(2).max(15).required(),
	occupancy: Joi.number().min(1).max(5).required(),
})

export const bookingInput = Joi.object({
	firstName: Joi.string().min(2).max(30).required(),
	lastName: Joi.string().min(2).max(30).required(),
	arrivalDate: Joi.string()
		.regex(/^\d\d\d\d-\d\d-\d\d/)
		.required(),
	departureDate: Joi.string()
		.regex(/^\d\d\d\d-\d\d-\d\d/)
		.required(),
	occupancy: Joi.number().min(1).max(5).required(),
})

export const paymentInput = Joi.object({
	dueDate: Joi.string()
		.regex(/^\d\d\d\d-\d\d-\d\d/)
		.required(),
	amount: Joi.number().min(1000).max(100000).required(),
})
