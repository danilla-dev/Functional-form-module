import emailjs from '@emailjs/browser'

export const handleSendEmail = async ({ emailData }) => {
	const emailParams = {
		user_email: emailData.user_email,
		activateToken: emailData.activateToken,
		verificationCode: emailData.verificationCode,
		from_name: 'AiAgent Team',
	}
	try {
		await emailjs.send('service_lz7paam', 'template_xom0uko', emailParams, {
			publicKey: '04XVAlf182bnevLBl',
		})
		console.log('Email sent successfully!')
	} catch (error) {
		console.error('Failed to send email:', error)
	}
}

export const handleRegister = async ({ data, setActiveStep, registerUser }) => {
	try {
		const result = await registerUser.mutateAsync(data)
		if (result.email) {
			const emailData = {
				user_email: result.email,
				activateToken: result.activateToken,
				verificationCode: result.verificationCode,
			}
			await handleSendEmail({ emailData })
			setActiveStep(1)
		}
	} catch (error) {
		console.error('Registration failed:', error)
	}
}

export const handleVerifyCode = async ({ data, setActiveStep, verifyCode, currentUser }) => {
	const { verificationCode } = data
	console.log(verificationCode)
	try {
		const result = await verifyCode.mutateAsync({ verificationCode, email: currentUser.email })
		if (result.status === 200) {
			setActiveStep(2)
		}
	} catch (error) {
		console.error('Verification failed:', error)
	}
}

export const handleSaveDetails = async ({ data, saveSubscriptionDetails }) => {
	try {
		const result = await saveSubscriptionDetails.mutateAsync(data)
		console.log('Subscription details saved:', result)
	} catch (error) {
		console.error('Failed to save subscription details:', error)
	}
}

export const handlePayment = async ({ data, payForSubscription }) => {
	try {
		const result = await payForSubscription.mutateAsync(data)
		console.log('Payment processed:', result)
	} catch (error) {
		console.error('Payment failed:', error)
	}
}
export const handleSaveIntegration = async ({ data, postIntegration }) => {
	console.log(postIntegration)
	try {
		const result = await postIntegration.mutateAsync(data)
		console.log('Integration details saved:', result)
	} catch (error) {
		console.error('Failed to save integration details:', error)
	}
}
