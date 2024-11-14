import { useMutation } from '@tanstack/react-query'
import {
	saveSubscriptionDetails as saveSubscriptionDetailsService,
	payForSubscription as payForSubscriptionService,
} from '../services/subServices'
import { useCallback } from 'react'
import { useSubscriptionQuery } from './useSubscriptionQuery'

export const useSubscriptionMutations = () => {
	const { subRefetch } = useSubscriptionQuery()
	const saveSubscriptionDetails = useMutation({
		mutationFn: saveSubscriptionDetailsService,
		onSuccess: data => {
			console.log('Subscription details saved:', data)
			subRefetch()
		},
		onError: error => {
			console.error('Error setting subscription details:', error.response?.data?.message || error.message)
		},
	})

	const payForSubscription = useMutation({
		mutationFn: payForSubscriptionService,
		onSuccess: async paymentIntent => {
			const { url } = paymentIntent
			window.location.href = url
		},
		onError: error => {
			console.error('Error paying for subscription:', error.response?.data?.message || error.message)
		},
	})

	const handleSaveDetails = useCallback(async ({ data }) => {
		try {
			const result = await saveSubscriptionDetails.mutateAsync(data)
			console.log('Subscription details saved:', result)
		} catch (error) {
			console.error('Failed to save subscription details:', error)
		}
	}, [])

	const handlePayment = useCallback(async ({ data }) => {
		try {
			const result = await payForSubscription.mutateAsync(data)
			console.log('Payment processed:', result)
		} catch (error) {
			console.error('Payment failed:', error)
		}
	}, [])

	return {
		saveSubscriptionDetails,
		payForSubscription,
		handleSaveDetails,
		handlePayment,
	}
}
