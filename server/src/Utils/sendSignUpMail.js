import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend'

export const sendRegistrationEmail = async (userEmail, token, code) => {
	const mailerSend = new MailerSend({
		apiKey: process.env.MAILER_API,
	})

	const sentFrom = new Sender('MS_HWFG0d@trial-7dnvo4dprk645r86.mlsender.net', 'NODEMAILER')

	const recipients = [new Recipient('dkaminski38@gmail.com', 'Client')]

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
