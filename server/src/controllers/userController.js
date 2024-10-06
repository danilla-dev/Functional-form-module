import { User } from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import crypto from 'crypto'

import { sendRegistrationEmail } from '../Utils/sendSignUpMail.js'

dotenv.config()

export const createUser = async (req, res) => {
	const { email, password } = req.body

	const generateToken = () => {
		return crypto.randomBytes(32).toString('hex')
	}

	const verifyToken = generateToken()

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

		res.status(201).json({ newUser, token })
	} catch (error) {
		console.error('Error creating user:', error)
		console.log(error)
	}
}

export const loginUser = async (req, res) => {
	console.log('loginUser')
}

export const fetchUserDetails = async (req, res) => {
	const userId = req.userId

	try {
		const user = await User.findById(userId)

		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		res.status(200).json(user)
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
