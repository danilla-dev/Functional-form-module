// src/middleware/auth.js
import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
	const verifyToken = req.query.toke
	if (!verifyToken) {
		return res.status(403).json({ message: 'No token, authorization denied' })
	}

	if (verifyToken) {
		req.verifyToken = verifyToken
	}

	next()
}

export default auth
