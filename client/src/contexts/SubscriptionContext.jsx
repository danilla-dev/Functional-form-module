import React, { createContext, useState, useEffect, useMemo } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from '../utils/axiosConfig'
import { useLocation } from 'react-router-dom'
import { pricingOptions } from '../data/mainSectionConstants'
import { set } from 'lodash'
export const SubscriptionContext = createContext()

const mode = import.meta.env.VITE_MODE
let API_URL = 'https://www.aiagent.petroweb.pl'
if (mode === 'development') {
	API_URL = 'http://localhost:4000'
}

export const SubscriptionProvider = ({ children }) => {
	// const [subscriptionDetails, setSubscriptionDetails] = useState({
	// 	name: '',
	// 	price: 0,
	// 	details: {
	// 		communicationStyle: '',
	// 		preferences: [],
	// 		communicationPreferences: '',
	// 	},
	// 	paymentStatus: '',
	// 	subscriptionDurationType: '',
	// 	subscriptionEndDate: '',
	// 	user: '',
	// })
	const [userIntegrations, setUserIntegrations] = useState([])

	console.log('subscriptionProvider is rendering')
	// console.log('subscriptionDetails:', subscriptionDetails)

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
			const response = await axios.get(`${API_URL}/api/sub/details`, {
				withCredentials: true,
			})
			console.log('POBRANO DANE SUBSKRYPCJI:', response.data.subscription)
			return response.data.subscription
		},
		refetchOnWindowFocus: false,
		enabled: location.pathname === '/dashboard',
		staleTime: 1000 * 60 * 2,
		cacheTime: 1000 * 60 * 5,
		// onSuccess: data => {
	})
	console.log('subData:', subData)

	const {
		data: userIntegrationsData,
		isLoading: userIntegrationsIsLoading,
		isError: userIntegrationsIsError,
		error: userIntegrationsError,
		refetch: userIntegrationsRefetch,
	} = useQuery({
		queryKey: ['userIntegrations'],
		queryFn: async () => {
			const response = await axios.get(`${API_URL}/api/integrations`, {
				withCredentials: true,
			})
			setUserIntegrations(response.data.integrations)
			return response.data.integrations
		},
		refetchOnWindowFocus: false,
		enabled: location.pathname === '/dashboard',
		staleTime: 1000 * 60 * 2,
		cacheTime: 1000 * 60 * 5,
	})

	const postIntegration = useMutation({
		mutationFn: async credentials => {
			console.log(credentials)
			const response = await axios.post(`${API_URL}/api/integrations`, credentials, {
				withCredentials: true,
			})
			return response.data
		},
		onSuccess: data => {
			setUserIntegrations(prevData => [...prevData, data.integration])
		},
		onError: error => {
			console.error('Error creating integration:', error.response?.data?.message || error.message)
		},
	})

	const saveSubscriptionDetails = useMutation({
		mutationFn: async credentials => {
			const response = await axios.post(`${API_URL}/api/sub/details`, credentials, {
				withCredentials: true,
			})
			return response.data
		},
		onSuccess: data => {
			// setSubscriptionDetails(data.subscription)
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

	const providerValue = useMemo(
		() => ({
			saveSubscriptionDetails,
			payForSubscription,
			// subscriptionDetails,
			// setSubscriptionDetails,
			subIsLoading,
			refetch,
			pricingOptions,
			subData,
			userIntegrations,
			postIntegration,
			userIntegrationsRefetch,
		}),
		[
			saveSubscriptionDetails,
			payForSubscription,
			// subscriptionDetails,
			// setSubscriptionDetails,
			subIsLoading,
			refetch,
			pricingOptions,
			subData,
			userIntegrations,
			postIntegration,
			userIntegrationsRefetch,
		]
	)

	return <SubscriptionContext.Provider value={providerValue}>{children}</SubscriptionContext.Provider>
}
