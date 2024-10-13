import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const postPayment = async (req, res) => {
	const { amount } = req.body
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
		})
		res.status(200).json({ url: session.url })
	} catch (error) {
		console.log(error)
		return res.status(400).json({ error: 'Payment failed' })
	}
}
