import { User } from '../models/userModel.js'
import { Subscription } from '../models/subModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import crypto from 'crypto'
import mongoose from 'mongoose'

dotenv.config()

const generateVerificationCode = () => {
	return Math.floor(100000 + Math.random() * 900000)
}
const createToken = (email, id) => {
	return jwt.sign({ email, id }, process.env.SECRET, { expiresIn: '5h' })
}

export const createUser = async (req, res) => {
	const { email, password } = req.body
	const verifyToken = crypto.randomBytes(32).toString('hex')
	const verifyCode = generateVerificationCode()

	try {
		const existingUser = await User.findOne({ email })

		if (existingUser) return res.status(400).json({ message: 'User already exists' })

		const hashedPassword = await bcrypt.hash(password, 12)

		const newUser = new User({
			email,
			password: hashedPassword,
			activateToken: verifyToken,
			isVerified: false,
			activeSub: false,
			verificationCode: verifyCode,
			subscription: null,
			activeSub: false,
		})
		const newSub = new Subscription({
			user: newUser._id,
			name: 'none',
			price: 0,
			details: { data: 'none' },
			paymentStatus: 'pending',
			subscriptionDurationType: 'months',
			subscriptionEndDate: new Date(),
		})
		await newUser.save()
		await newSub.save()

		const token = createToken(newUser.email, newUser._id)

		res
			.status(201)
			.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV !== 'development' })
			.cookie('authStatus', true, { httpOnly: false, secure: process.env.NODE_ENV !== 'development' })
			.json({
				email: newUser.email,
				id: newUser._id,
				details: {},
				paymentStatus: 'pending',
				isVerified: newUser.isVerified,
				activateToken: verifyToken,
				verificationCode: verifyCode,
				subscription: null,
				activeSub: newUser.activeSub,
			})
	} catch (error) {
		console.error('Error creating user:', error)
		console.log(error)
		return res.status(500).json({ message: 'Internal server error' })
	}
}

export const loginUser = async (req, res) => {
	const { email, password } = req.body
	try {
		const user = await User.findOne({ email })
		if (!user) return res.status(404).json({ type: 'email', message: 'User not found' })

		const isPasswordCorrect = await bcrypt.compare(password, user.password)
		if (!isPasswordCorrect) return res.status(400).json({ type: 'password', message: 'Invalid password' })

		const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET, { expiresIn: '5h' })
		res
			.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV !== 'development' })
			.cookie('authStatus', true, { httpOnly: false, secure: process.env.NODE_ENV !== 'development' })
			.status(200)
			.json({
				email: user.email,
				id: user._id,
				isVerified: user.isVerified,
				subscription: user.subscription,
				activeSub: user.activeSub,
			})
	} catch (error) {
		console.error('Error logging in:', error)
		return res.status(500).json({ message: 'Internal server error' })
	}
}

export const fetchUserDetails = async (req, res) => {
	const token = req.cookies.token
	const verifyToken = req.query.token
	console.log('fetchUserDetails')

	if (!token && !verifyToken) return res.status(401).json({ message: 'Unauthorized' })

	try {
		if (verifyToken !== 'null') {
			const user = await User.findOne({ activateToken: verifyToken })
			if (!user) return res.status(404).json({ message: 'User not found' })

			const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET, { expiresIn: '5h' })
			return res
				.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV !== 'development' })
				.cookie('authStatus', true, { httpOnly: false, secure: process.env.NODE_ENV !== 'development' })
				.status(200)
				.json({
					user: {
						email: user.email,
						id: user._id,
						isVerified: user.isVerified,
						subscription: user.subscription,
						activeSub: user.activeSub,
					},
				})
		}

		const decoded = jwt.verify(token, process.env.SECRET)
		const user = await User.findOne({ email: decoded.email })
		if (!user) return res.status(404).json({ message: 'User not found' })

		res
			.status(200)
			.cookie('authStatus', true, { httpOnly: false, secure: process.env.NODE_ENV !== 'development' })
			.json({
				user: { ...decoded, isVerified: user.isVerified, subscription: user.subscription, activeSub: user.activeSub },
			})
	} catch (error) {
		if (error.name === 'TokenExpiredError') {
			return res.status(401).json({ message: 'Token has expired' })
		}
		console.error('Error fetching user:', error)
		res.status(500).json({ message: 'Internal server error' })
	}
}

export const verifyUser = async (req, res) => {
	const { email, verificationCode } = req.body
	console.log(verificationCode)
	console.log(email)

	try {
		const user = await User.findOne({ email })
		if (!user) return res.status(404).json({ message: 'User not found' })

		if (user.verificationCode !== parseInt(verificationCode))
			return res.status(400).json({ message: 'Invalid verification code' })

		user.isVerified = true
		await user.save()

		res.status(200).json({ message: 'User verified' })
	} catch (error) {
		console.error('Error verifying user:', error)
		res.status(500).json({ message: 'Internal server error' })
	}
}
export const logoutUser = async (req, res) => {
	try {
		res
			.clearCookie('token', {
				httpOnly: true,
				secure: process.env.NODE_ENV !== 'development',
			})
			.cookie('authStatus', false, { httpOnly: false, secure: process.env.NODE_ENV !== 'development' })
			.status(200)
			.json({ message: 'User logged out' })
	} catch (error) {
		return res.status(400).json({ message: 'Logout failed' })
	}
}
