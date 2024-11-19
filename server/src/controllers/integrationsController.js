import { User } from '../models/userModel.js'
import { Integration } from '../models/integrationModel.js'

export const postUserIntegration = async (req, res) => {
	const userEmail = req.userEmail
	const { platform, apiKey } = req.body

	if (!platform || !apiKey) {
		return res.status(400).json({ message: 'Missing required fields' })
	}

	try {
		const user = await User.findOne({ email: userEmail })
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}
		const newIntegration = await Integration.create({
			user: user._id,
			name: platform,
			apiKey: apiKey,
		})

		await User.findByIdAndUpdate(
			user._id,
			{
				$set: { integration: newIntegration._id },
			},
			{ new: true }
		)
		res
			.status(201)
			.json({ message: 'Integration created', integration: newIntegration.name, integrationKey: newIntegration.apiKey })
	} catch (error) {
		console.error('Error creating integration:', error)
		console.log(error)
		res.status(500).json({ message: 'Error creating integration', error: error.message })
	}
}

export const getUserIntegration = async (req, res) => {
	const userEmail = req.userEmail
	try {
		const user = await User.findOne({ email: userEmail })
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}
		const integrations = await Integration.find({ user: user._id })
		if (!integrations) {
			return res.status(404).json({ message: 'Integrations not found' })
		}
		const integrationsList = integrations.map(integration => {
			return { platform: integration.name, apiKey: integration.apiKey }
		})
		res.status(200).json({ integrations: integrationsList })
	} catch (error) {
		console.error('Error getting user integrations:', error)
		console.log(error)
		res.status(500).json({ message: 'Error getting integrations', error: error.message })
	}
}

export const deleteUserIntegration = async (req, res) => {
	const userEmail = req.userEmail
	const { platform } = req.body

	if (!platform) {
		return res.status(400).json({ message: 'Missing required fields' })
	}

	try {
		const user = await User.findOne({ email: userEmail })
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}
		const integration = await Integration.findOneAndDelete({ user: user._id, name: platform }).populate(
			'user',
			'integration'
		)
		if (!integration) {
			return res.status(404).json({ message: 'Integration not found' })
		}
		await User.findByIdAndUpdate(
			user._id,
			{
				$unset: { integration: integration._id },
			},
			{ new: true }
		)
		res.status(200).json({ message: 'Integration deleted', integration: integration.name })
	} catch (error) {
		console.error('Error deleting integration:', error)
		console.log(error)
		res.status(500).json({ message: 'Error deleting integration', error: error.message })
	}
}

export const updateApiKey = async (req, res) => {
	const userEmail = req.userEmail
	const { platform, apiKey } = req.body

	console.log('updateApiKey:', req.body)

	if (!platform || !apiKey) {
		return res.status(400).json({ message: 'Missing required fields' })
	}

	try {
		const user = await User.findOne({
			email: userEmail,
		})
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}
		const integration = await Integration.findOneAndUpdate(
			{
				user: user._id,
				name: platform,
			},
			{
				$set: { apiKey: apiKey },
			},
			{ new: true }
		)
		if (!integration) {
			return res.status(404).json({ message: 'Integration not found' })
		}
		res
			.status(200)
			.json({ message: 'Integration updated', integration: integration.name, integrationKey: integration.apiKey })
	} catch {
		console.error('Error updating integration:', error)
		console.log(error)
		res.status(500).json({ message: 'Error updating integration', error: error.message })
	}
}
