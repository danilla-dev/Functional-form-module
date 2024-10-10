// src/middleware/auth.js
import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
	const token = req.cookies.token
	const verifyToken = req.query.token

	if (!token && !verifyToken) {
		return res.status(403).json({ message: 'No token, authorization denied' })
	}

	try {
		if (token) {
			const decoded = jwt.verify(token, process.env.SECRET)
			req.userId = decoded.id
		}

		if (verifyToken) {
			req.verifyToken = verifyToken
		}

		next()
	} catch (error) {
		console.error('Token verification error:', error)
		res.status(401).json({ message: 'Token is not valid' })
	}
}

export default auth
