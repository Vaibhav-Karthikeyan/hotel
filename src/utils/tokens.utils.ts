import { sign } from 'jsonwebtoken'

const createAccessToken = (manID, secret, expiresIn) =>
	sign({ manID }, secret, {
		expiresIn,
	})

export default createAccessToken
