// hooks/useSubscriptionForm.js
import { useEffect, useState, useCallback } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useSubscribe } from '../hooks/useSubscribe'
import { handleRegister, handleVerifyCode, handleSaveDetails, handlePayment } from '../handlers/subscriptionHandlers'
import Cookies from 'js-cookie'
const isLoggedIn = Cookies.get('authStatus') === 'true'

const useSubscriptionForm = (activeStep, setActiveStep, plan) => {
	const { currentUser, registerUser, verifyCode, userData } = useAuth()
	const { saveSubscriptionDetails, payForSubscription } = useSubscribe()

	const [errors, setErrors] = useState(null)

	console.log('currentUser', currentUser)

	useEffect(() => {
		if (isLoggedIn) {
			const { isVerified, subscription } = currentUser
			if (isVerified) {
				setActiveStep(2)
			} else if (!isVerified) {
				setActiveStep(1)
			}
		}
	}, [userData, setActiveStep])

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
