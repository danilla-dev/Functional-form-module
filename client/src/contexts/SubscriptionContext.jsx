import React, { createContext, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from '../utils/axiosConfig'
import { useLocation } from 'react-router-dom'
import { pricingOptions } from '../data/mainSectionConstants'
export const SubscriptionContext = createContext()

const mode = import.meta.env.VITE_MODE
let API_URL = 'https://functional-form-module-1.onrender.com'
if (mode === 'development') {
	API_URL = 'http://localhost:4000'
}

export const SubscriptionProvider = ({ children }) => {
	const [subscriptionDetails, setSubscriptionDetails] = useState({
		name: '',
		price: 0,
		details: {
			communicationStyle: '',
			preferences: [],
			communicationPreferences: '',
		},
		paymentStatus: '',
		subscriptionDurationType: '',
		subscriptionEndDate: '',
		user: '',
	})

	const location = useLocation()

	const {
		data: subData,
		isLoading: subIsLoading,
		isError,
		error,
		refetch,
	} = useQuery({
		queryKey: ['subData'],
		queryFn: async () => {
			console.log('subData queryFn is running')
			const response = await axios.get(`${API_URL}/api/sub/details`, {
				withCredentials: true,
			})
			console.log(response.data.subscription)
			return response.data.subscription
		},
		refetchOnWindowFocus: false,
		enabled: location.pathname === '/dashboard',
		staleTime: 1000 * 60 * 2,
		cacheTime: 1000 * 60 * 5,
		onSuccess: data => {
			setCurrentUser(
				subData || {
					name: '',
					price: 0,
					details: {
						communicationStyle: '',
						preferences: [],
						communicationPreferences: '',
					},
					paymentStatus: '',
					subscriptionDurationType: '',
					subscriptionEndDate: '',
					user: '',
				}
			)
			refetch()
		},
	})

	const saveSubscriptionDetails = useMutation({
		mutationFn: async credentials => {
			console.log('saveSubscriptionDetails mutationFn is running')
			const response = await axios.post(`${API_URL}/api/sub/details`, credentials, {
				withCredentials: true,
			})
			return response.data
		},
		onSuccess: data => {
			console.log('Subscription details saved:', data)
			setSubscriptionDetails(data.subscription)
		},
		onError: error => {
			console.error('Error setting subscription details:', error.response?.data?.message || error.message)
		},
	})

	const payForSubscription = useMutation({
		mutationFn: async credentials => {
			const response = await axios.post(`${API_URL}/api/payment/`, credentials, {
				withCredentials: true,
			})
			return response.data
		},
		onSuccess: async paymentIntent => {
			const { url } = paymentIntent
			window.location.href = url
		},
		onError: error => {
			console.error('Error paying for subscription:', error.response?.data?.message || error.message)
		},
	})

	return (
		<SubscriptionContext.Provider
			value={{
				saveSubscriptionDetails,
				payForSubscription,
				subscriptionDetails,
				setSubscriptionDetails,
				subIsLoading,
				refetch,
				pricingOptions,
				subData,
			}}
		>
			{children}
		</SubscriptionContext.Provider>
	)
}
