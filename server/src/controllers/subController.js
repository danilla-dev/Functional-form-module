import { Subscription } from '../models/subModel.js'
import { User } from '../models/userModel.js'
import mongoose from 'mongoose'
export const getUserSubscription = async (req, res) => {
	const userID = req.userId
	const userEmail = req.userEmail
	try {
		const user = await User.findOne({ email: userEmail })

		const subscription = await Subscription.findOne({ user: user._id })
		if (!subscription) {
			return res.status(404).json({ message: 'Subscription not found' })
		}
		res.status(200).json({ subscription })
	} catch (error) {
		console.error('Error getting user subscription:', error)
		console.log(error)
	}
}
export const postUserSubscription = async (req, res) => {
	const userID = req.userId
	const userEmail = req.userEmail

	const { communicationStyle, preferences, communicationPreferences } = req.body
	const details = {
		communicationStyle,
		preferences,
		communicationPreferences,
	}
	try {
		const user = await User.findOne({ email: userEmail })

		const subDate = new Date()
		const newSub = await Subscription.findOneAndUpdate(
			{ user: user._id },
			{
				$set: {
					user: user._id,
					name: 'Basic',
					price: 99,
					details: details,
					paymentStatus: 'pending',
					subscriptionDurationType: 'months',
					subscriptionEndDate: subDate.setMonth(subDate.getMonth() + 1),
				},
			},
			{ new: true }
		)

		await User.findByIdAndUpdate(
			user._id,
			{
				$set: { subscription: newSub._id },
			},
			{ new: true }
		)

		res.status(201).json({ message: 'Subscription created', subscription: newSub })
	} catch (error) {
		console.error('Error creating subscription:', error)
		console.log(error)
	}
}
// Compare this snippet from server/src/controllers/userController.js:
