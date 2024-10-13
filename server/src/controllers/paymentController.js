import { User } from '../models/userModel.js'
import { Subscription } from '../models/subModel.js'

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const postPayment = async (req, res) => {
	const { amount } = req.body
	const user = await User.findOne({ _id: req.userId })
	const sub = await Subscription.findOne({ user: user._id })
	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: [
				{
					price_data: {
						currency: 'usd',
						product_data: {
							name: 'Basic subscription',
						},
						unit_amount: amount,
					},
					quantity: 1,
				},
			],
			mode: 'payment',
			success_url: `${process.env.CLIENT_URL}/success`,
			cancel_url: `${process.env.CLIENT_URL}/cancel`,
			metadata: { user_id: toString(user._id), sub_id: toString(sub._id) },
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
	const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

	let event

	try {
		event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
	} catch (err) {
		return res.status(400).send(`Webhook Error: ${err.message}`)
	}

	if (event.type === 'checkout.session.completed') {
		const session = event.data.object

		const userId = session.metadata.user_id
		const subscriptionId = session.metadata.sub_id

		try {
			const user = await User.findOne({ _id: userId })
			const sub = await Subscription.findOne({ user: user._id })

			await user.updateOne({ activeSub: true }, { new: true })
			await sub.updateOne({ paymentStatus: 'paid' }, { new: true })

			console.log('userId:', userId)
			console.log('subscriptionId:', subscriptionId)

			return res.status(200).send('Webhook received and processed')
		} catch (error) {
			console.error('Error updating subscription:', error)
			return res.status(500).send('Webhook processing error')
		}
	}
	res.status(400).send('Unhandled event')
}
