// hooks/useSubscriptionSelector.js
import { useEffect, useState } from 'react'

const useSubscriptionSelector = (initialPlan, setSelectedPlan, navigate, valueProps, setValue) => {
	const [selectedPlan, setLocalPlan] = useState(initialPlan)

	useEffect(() => {
		if (selectedPlan) {
			setSelectedPlan(selectedPlan)
			navigate(`/subscription?plan=${selectedPlan.toLowerCase()}`)
		}
		if (valueProps) {
			setValue('subscriptionPlan', valueProps)
		}
	}, [selectedPlan, setSelectedPlan, navigate, valueProps, setValue])

	const handlePlanChange = newPlan => {
		setLocalPlan(newPlan)
	}

	return { selectedPlan, handlePlanChange }
}

export default useSubscriptionSelector
