import nodemailer from 'nodemailer'
import crypto from 'crypto'

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'mail.dev.0000@gmail.com',
		pass: 'ylds pzbx zovw fiir',
	},
})

export const sendRegistrationEmail = async (userEmail, token) => {
	const mailOptions = {
		from: 'twojemail@gmail.com',
		to: userEmail,
		subject: 'Rejestracja zakończona sukcesem',
		text: `Thank you for registering!
      We appreciate your interest in our service. If you haven't completed your registration yet, you can do so by clicking the link below:
     https://functional-form-module-1.onrender.com/subscription?token=${token}
      Thank you for choosing us!`,
	}

	try {
		const info = await transporter.sendMail(mailOptions)
	} catch (error) {
		console.error('Błąd przy wysyłaniu maila:', error)
	}
}
