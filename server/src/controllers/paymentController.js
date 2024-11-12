import { User } from '../models/userModel.js'
import { Subscription } from '../models/subModel.js'

import Stripe from 'stripe'
import e from 'express'

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
		const customer = await stripe.customers.create({
			email: user.email,
			metadata: {
				sub_name: name.toString(),
			},
		})
		await user.updateOne({ stripeCustomerId: customer.id })
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
			customer: customer.id,
			success_url: `${process.env.CLIENT_URL}/dashboard`,
			cancel_url: `${process.env.CLIENT_URL}/cancel`,
		})
		res.status(200).json({ url: session.url })
	} catch (error) {
		console.log(error)
		return res.status(400).json({ error: 'Payment failed' })
	}
}
export const updateDatabase = async (req, res) => {
	const sig = req.headers['stripe-signature']
	const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

	if (!sig || !endpointSecret) {
		return res.status(400).send('Missing Stripe signature or webhook secret')
	}

	let event
	try {
		event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
	} catch (err) {
		console.error('Webhook Signature Error:', err.message)
		return res.status(400).send(`Webhook Error: ${err.message}`)
	}
	if (event.type === 'checkout.session.completed') {
		const session = event.data.object
		const customerId = session.customer
		const customer = await stripe.customers.retrieve(customerId)
		const subName = customer.metadata.sub_name

		try {
			const user = await User.findOne({ stripeCustomerId: customerId })
			if (!user) {
				return res.status(404).send('User not found')
			}

			const sub = await Subscription.findOne({ user: user._id })
			if (!sub) {
				return res.status(404).send('Subscription not found')
			}

			await user.updateOne({ activeSub: true })
			await sub.updateOne({ paymentStatus: 'paid', name: subName })

			console.log(`User ${user.email} subscription updated successfully`)
			return res.status(200).send('Webhook received and processed')
		} catch (error) {
			console.error('Error updating subscription:', error)
			return res.status(500).send('Webhook processing error')
		}
	} else {
		console.log(`Unhandled event type: ${event.type}`)
	}

	res.status(400).send('Unhandled event')
}
