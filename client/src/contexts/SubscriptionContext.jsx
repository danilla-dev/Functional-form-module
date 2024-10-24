import React, { createContext, useState, useEffect, Children } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from '../utils/axiosConfig'
import { useAuth } from '../hooks/useAuth'
import { useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

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
	const pricingOptions = [
		{
			name: 'Basic',
			price: 9.99,
			description: 'Ideal for casual users who need basic AI assistance in their day-to-day activities.',
			features: [
				'Personalized recommendations based on interactions',
				'Basic Q&A capabilities',
				'Access to AI insights and suggestions',
				'Integration with one platform (e.g., calendar, email)',
			],
			limits: [
				'Up to 50 interactions per month',
				'Limited to text-based interactions only',
				'1 personalized AI workflow',
			],
		},
		{
			name: 'Pro',
			price: 19.99,
			description: 'For power users who want more customization and advanced capabilities from their AI assistant.',
			features: [
				'Everything in Basic Plan',
				'Advanced personalization and in-depth AI learning',
				'Voice command support',
				'Integration with up to 3 platforms (e.g., calendar, email, task management)',
				'Priority support',
			],
			limits: [
				'Up to 200 interactions per month',
				'3 personalized AI workflows',
				'Real-time notifications and updates',
			],
			best: true,
		},
		{
			name: 'Premium',
			price: 39.99,
			description: 'The ultimate AI plan with unlimited interaction and full integration options.',
			features: [
				'Everything in Pro Plan',
				'Unlimited interactions',
				'Advanced analytics and insights on behavior',
				'Full integration with up to 10 platforms (e.g., calendar, email, project management, e-commerce)',
				'AI-driven automation for tasks and reminders',
				'Dedicated customer success manager',
			],
			limits: ['Everything unlimited!'],
		},
	]
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
			return response.data
		},
		refetchOnWindowFocus: false,
		enabled: !!subscriptionDetails.name && location.pathname !== '/dashboard',
		staleTime: 1000 * 60 * 2,
		cacheTime: 1000 * 60 * 5,
	})

	useEffect(() => {
		if (subData) {
			setSubscriptionDetails(subData.subscription)
		}
	}, [subData, subscriptionDetails])

	const saveSubscriptionDetails = useMutation({
		mutationFn: async credentials => {
			console.log('saveSubscriptionDetails mutationFn is running')
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
		<SubscriptionContext.Provider
			value={{
				saveSubscriptionDetails,
				payForSubscription,
				subscriptionDetails,
				setSubscriptionDetails,
				subIsLoading,
				refetch,
				pricingOptions,
			}}
		>
			{children}
		</SubscriptionContext.Provider>
	)
}
