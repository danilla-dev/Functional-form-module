import { User } from '../models/userModel.js'
import { Integration } from '../models/integrationModel.js'

export const postUserIntegration = async (req, res) => {
	const userEmail = req.userEmail
	const { platform, apiKey } = req.body
	console.log(platform)
	console.log(apiKey)

	if (!platform || !apiKey) {
		return res.status(400).json({ message: 'Missing required fields' })
	}

	try {
		const user = await User.findOne({ email: userEmail })
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		const newIntegration = await Integration.findOneAndUpdate(
			{ user: user._id },
			{
				$set: {
					user: user._id,
					name: platform,
					apiKey: apiKey,
				},
			},
			{ new: true, upsert: true }
		)

		await User.findByIdAndUpdate(
			user._id,
			{
				$set: { integration: newIntegration._id },
			},
			{ new: true }
		)
		console.log('wykonano zapisanie integracji')
		res.status(201).json({ message: 'Integration created', integration: newIntegration.name })
	} catch (error) {
		console.error('Error creating integration:', error)
		console.log(error)
		res.status(500).json({ message: 'Error creating integration', error: error.message })
	}
}

export const getUserIntegration = async (req, res) => {}
