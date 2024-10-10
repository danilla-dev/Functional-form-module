// src/middleware/auth.js
import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
	const token = req.cookies.token
	if (!token) return res.status(403).json({ message: 'No token, authorization denied' })
	try {
		const decoded = jwt.verify(token, process.env.SECRET)
		req.userId = decoded.id
		next()
	} catch (error) {
		res.status(401).json({ message: 'Token is not valid' })
	}
}

export default auth
