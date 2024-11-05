import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
	const token = req.cookies.token

	console.log('Auth middleware is running')

	if (!token || token === 'null') {
		return res.status(401).json({ message: 'No token, authorization denied' })
	}

	try {
		const decoded = jwt.verify(token, process.env.SECRET)
		req.userId = decoded.id
		req.userEmail = decoded.email

		next()
	} catch (error) {
		console.error('Token verification error:', error)

		res.clearCookie('token')
		return res.status(401).json({ message: 'Token is not valid' })
	}
}

export default auth
