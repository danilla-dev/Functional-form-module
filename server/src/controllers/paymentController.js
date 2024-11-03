import { User } from '../models/userModel.js'
import { Subscription } from '../models/subModel.js'

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const postPayment = async (req, res) => {
	const { amount, name } = req.body
	if (!amount || !name) {
		return res.status(400).json({ error: 'Amount and name are required' })
	}

	const user = await User.findOne({ _id: req.userId })
	if (!user) {
		return res.status(404).json({ error: 'User not found' })
	}
	const sub = await Subscription.findOne({ user: user._id })
	if (!sub) {
		return res.status(404).json({ error: 'Subscription not found' })
	}
	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: [
				{
					price_data: {
						currency: 'usd',
						product_data: {
							name: `${name} subscription`,
						},
						unit_amount: Math.round(amount * 100),
					},
					quantity: 1,
				},
			],
			mode: 'payment',
			success_url: `${process.env.CLIENT_URL}/dashboard`,
			cancel_url: `${process.env.CLIENT_URL}/cancel`,
			metadata: { user_id: user._id.toString(), sub_name: name.toString() },
		})
		res.status(200).json({ url: session.url })
	} catch (error) {
		console.log(error)
		return res.status(400).json({ error: 'Payment failed' })
	}
}
export const updateDatabase = async (req, res) => {
	console.log('Webhook received')
	const sig = req.headers['stripe-signature']
	const endpointSecret = 'whsec_c056cf9a1c4190092b9687aa56a31d7c74207b835ef96a534a163036ce202445'

	let event

	try {
		event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
	} catch (err) {
		console.log('Error:', err.message)
		return res.status(400).send(`Webhook Error: ${err.message}`)
	}

	if (event.type === 'checkout.session.completed') {
		const session = event.data.object
		const userId = session.metadata.user_id
		const subName = session.metadata.sub_name

		try {
			const user = await User.findOne({ _id: userId })
			if (!user) {
				return res.status(404).send('User not found')
			}
			const sub = await Subscription.findOne({ user: user._id })
			if (!sub) {
				return res.status(404).send('Subscription not found')
			}

			await user.updateOne({ activeSub: true }, { new: true })
			await sub.updateOne({ paymentStatus: 'paid', name: subName }, { new: true })

			return res.status(200).send('Webhook received and processed')
		} catch (error) {
			console.error('Error updating subscription:', error)
			return res.status(500).send('Webhook processing error')
		}
	} else {
		console.log('error')
	}
	res.status(400).send('Unhandled event')
}
