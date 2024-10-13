import React, { createContext, useState, useEffect, Children } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from '../utils/axiosConfig'
import { useAuth } from '../hooks/useAuth'
import { useLocation, useNavigate } from 'react-router-dom'

export const SubscriptionContext = createContext()

const mode = import.meta.env.VITE_MODE
let API_URL = 'https://functional-form-module-1.onrender.com'
if (mode === 'development') {
	API_URL = 'http://localhost:4000'
}

export const SubscriptionProvider = ({ children }) => {
	const location = useLocation()

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
	console.log('subscriptionDetails-', subscriptionDetails)

	const {
		data: subData,
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery({
		queryKey: ['subData'],
		queryFn: async () => {
			const response = await axios.get(`${API_URL}/api/sub/details`, {
				withCredentials: true,
			})
			return response.data
		},
		refetchOnWindowFocus: false,
	})

	useEffect(() => {
		if (subData) {
			setSubscriptionDetails(subData.subscription)
		}
	}, [subData])

	const saveSubscriptionDetails = useMutation({
		mutationFn: async credentials => {
			const response = await axios.post(`${API_URL}/api/sub/details`, credentials, {
				withCredentials: true,
			})
			return response.data
		},
		onSuccess: data => {
			console.log(data)
			setSubscriptionDetails(data.subscription)
		},
		onError: error => {
			console.error('Error setting subscription details:', error)
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
			console.error('Error paying for subscription:', error)
		},
	})
	return (
		<SubscriptionContext.Provider value={{ saveSubscriptionDetails, payForSubscription, subscriptionDetails }}>
			{children}
		</SubscriptionContext.Provider>
	)
}
