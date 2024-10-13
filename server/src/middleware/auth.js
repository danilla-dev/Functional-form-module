// src/middleware/auth.js
import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
	const token = req.cookies.token
	const verifyToken = req.query.token

	console.log('auth middleware is running')

	if (!token && !verifyToken) {
		return res.status(403).json({ message: 'No token, authorization denied' })
	}

	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.SECRET)
			req.userEmail = decoded.email
			req.userId = decoded.id
		} catch (error) {
			console.error('Token verification error:', error)
			return res.status(401).json({ message: 'Token is not valid' })
		}
	}

	if (verifyToken) {
		req.verifyToken = verifyToken
	}

	next()
}

export default auth
