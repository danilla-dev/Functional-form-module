export const handleSendEmail = async ({ emailData }) => {
	const emailParams = {
		user_email: emailData.user_email,
		activateToken: emailData.activateToken,
		verificationCode: emailData.verificationCode,
		from_name: 'AiAgent Team',
	}
	emailjs
		.send('service_lz7paam', 'template_xom0uko', emailParams, {
			publicKey: '04XVAlf182bnevLBl',
		})
		.then(
			() => {
				console.log('SUCCESS!')
			},
			error => {
				console.log('FAILED...', error.text)
			}
		)
}

export const handleRegister = async ({ data, setActiveStep, registerUser }) => {
	const result = await registerUser.mutateAsync(data)
	if (result.email) {
		const emailData = {
			user_email: result.email,
			activateToken: result.activateToken,
			verificationCode: result.verificationCode,
		}
		try {
			await handleSendEmail(emailData)
			setActiveStep(1)
		} catch (err) {
			console.log(err)
		}
	}
}
export const handleVerifyCode = async ({ data, setActiveStep, verifyCode, currentUser }) => {
	const { verificationCode } = data
	const result = await verifyCode.mutateAsync({ verificationCode, email: currentUser.email })
	if (result.isVerified) {
		setActiveStep(2)
	}
}

export const handleSaveDetails = async ({ data, saveSubscriptionDetails }) => {
	const result = await saveSubscriptionDetails.mutateAsync(data)
}

export const handlePayment = async ({ data, payForSubscription }) => {
	console.log(payForSubscription)
	const result = await payForSubscription.mutateAsync(data)
}
