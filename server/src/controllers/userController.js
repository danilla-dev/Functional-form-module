import { User } from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const createUser = async (req, res) => {
	const { email, password } = req.body
	try {
		// Check if user already exists
		const existingUser = await User.findOne({ email })
		if (existingUser) return res.status(400).json({ message: 'User already exists' })

		// Hash password

		const hashedPassword = await bcrypt.hash(password, 12)

		// Create new user
		const newUser = new User({
			email,
			password: hashedPassword,
		})
		newUser.save()

		// Create JWT
		const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.SECRET, { expiresIn: '5h' })

		res.status(201).json({ newUser, token })
	} catch (error) {
		console.error('Error creating user:', error)
	}
}

export const loginUser = async (req, res) => {
	console.log('loginUser')
}

export const fetchUserDetails = async (req, res) => {
	const userId = req.userId

	try {
		const user = await User.findById(userId)
		if (!user) return res.status(404).json({ message: 'User not found' })
		res.status(200).json(user)
	} catch (error) {
		console.error('Error fetching user:', error)
	}
}
