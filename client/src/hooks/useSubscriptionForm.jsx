// hooks/useSubscriptionForm.js
import { useEffect, useState, useCallback } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useSubscribe } from '../hooks/useSubscribe'
import { handleRegister, handleVerifyCode, handleSaveDetails, handlePayment } from '../handlers/subscriptionHandlers'

const useSubscriptionForm = (activeStep, setActiveStep, plan) => {
	const { currentUser, registerUser, verifyCode } = useAuth()
	const { saveSubscriptionDetails, payForSubscription } = useSubscribe()

	const [errors, setErrors] = useState(null)

	useEffect(() => {
		if (currentUser.email !== '') {
			const { isVerified, subscription } = currentUser
			if (!isVerified) {
				setActiveStep(1)
			} else if (isVerified && subscription === null) {
				setActiveStep(2)
			}
		} else {
			setActiveStep(0)
		}
	}, [currentUser, setActiveStep])

	const nextStep = useCallback(
		async data => {
			try {
				switch (activeStep) {
					case 0:
						await handleRegister({ data, setActiveStep, registerUser })
						break
					case 1:
						await handleVerifyCode({ data, setActiveStep, verifyCode, currentUser })
						break
					case 2:
						await handleSaveDetails({ data, saveSubscriptionDetails })
						await handlePayment({ data: { amount: plan.price, name: plan.name }, payForSubscription })
						setActiveStep(3)
						break
					default:
						break
				}
			} catch (error) {
				setErrors(error)
			}
		},
		[activeStep, registerUser, setActiveStep, saveSubscriptionDetails, payForSubscription, plan]
	)

	return { nextStep, errors }
}

export default useSubscriptionForm
