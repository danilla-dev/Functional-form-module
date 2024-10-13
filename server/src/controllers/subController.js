import { Subscription } from '../models/subModel.js'
import { User } from '../models/userModel.js'
import mongoose from 'mongoose'
export const getUserSubscription = async (req, res) => {
	// getSub
	res.send('getSub')
}
export const postUserSubscription = async (req, res) => {
	const userID = req.userId
	const { communicationStyle, preferences, communicationPreferences } = req.body
	const details = {
		communicationStyle,
		preferences,
		communicationPreferences,
	}
	try {
		const user = await User.findOne(userID)

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
					subscriptionEndDate: new Date(),
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

		res.status(201).json({ message: 'Subscription created' })
	} catch (error) {
		console.error('Error creating subscription:', error)
		console.log(error)
	}
}
// Compare this snippet from server/src/controllers/userController.js:
