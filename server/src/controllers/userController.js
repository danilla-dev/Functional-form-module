import { User } from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import crypto from 'crypto'

import { sendRegistrationEmail } from '../Utils/sendSignUpMail.js'

dotenv.config()

export const createUser = async (req, res) => {
	const { email, password } = req.body
	const verifyToken = crypto.randomBytes(32).toString('hex')

	try {
		const existingUser = await User.findOne({ email })

		if (existingUser) return res.status(400).json({ message: 'User already exists' })

		const hashedPassword = await bcrypt.hash(password, 12)

		const newUser = new User({
			email,
			password: hashedPassword,
			activateToken: verifyToken,
		})
		newUser.save()

		const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.SECRET, { expiresIn: '5h' })

		await sendRegistrationEmail(newUser.email, verifyToken)

		res
			.status(201) // Najpierw ustaw status
			.cookie('token', token, { httpOnly: true, sameSite: 'Strict', secure: process.env.NODE_ENV !== 'development' })
			.json({ email: newUser.email, id: newUser._id })
	} catch (error) {
		console.error('Error creating user:', error)
		console.log(error)
	}
}

export const loginUser = async (req, res) => {
	console.log('loginUser')
	const { email, password } = req.body
	try {
		const user = await User.findOne({ email })
		if (!user) return res.status(404).json({ message: 'User not found' })
		const isPasswordCorrect = await bcrypt.compare(password, user.password)
		if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' })

		const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET, { expiresIn: '5h' })

		res
			.cookie('token', token, { httpOnly: true, sameSite: 'Strict', secure: process.env.NODE_ENV !== 'development' })
			.status(200)
			.json({ email: user.email, id: user._id })
	} catch (error) {
		console.error('Error logging in:', error)
		return res.status(500).json({ message: 'Internal server error' })
	}
}

export const fetchUserDetails = async (req, res) => {
	const token = req.cookies.token

	if (!token) return res.status(401).json({ message: 'Unauthorized' })

	try {
		const decoded = jwt.verify(token, process.env.SECRET)

		res.status(200).json({ user: decoded })
	} catch (error) {
		console.error('Error fetching user:', error)
		res.status(500).json({ message: 'Internal server error' })
	}
}

export const continueRegistration = async (req, res) => {
	const verifyToken = req.query.token

	try {
		const user = await User.findOne({ activateToken: verifyToken })

		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET, { expiresIn: '5h' })

		res.status(200).json({ user, token })
	} catch (error) {
		console.error('Error continuing registration:', error)
		return res.status(500).json({ message: 'Internal server error' })
	}
}
