import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend'

export const sendRegistrationEmail = async (userEmail, token, code) => {
	const mailerSend = new MailerSend({
		apiKey: process.env.MAILER_API,
	})

	const sentFrom = new Sender('MS_urdoso@trial-k68zxl2ywp94j905.mlsender.net', 'FIRST')

	const recipients = [new Recipient(userEmail, 'Client')]

	// const verificationLink = `https://functional-form-module-1.onrender.com/subscription?token=${token}`
	const verificationLink = `http://localhost:5173/subscription?token=${token}`

	const emailText = `Thank you for registering! We appreciate your interest in our service. This is your verification code ${code} If you haven't completed your registration yet, you can do so by clicking the link below: ${verificationLink} Thank you for choosing us!`

	const emailParams = new EmailParams()
		.setFrom(sentFrom)
		.setTo(recipients)
		.setReplyTo(sentFrom)
		.setSubject('This is a Subject')
		.setText(emailText)

	try {
		await mailerSend.email.send(emailParams)
	} catch (error) {
		console.error('Błąd przy wysyłaniu maila:', error)
	}
}
