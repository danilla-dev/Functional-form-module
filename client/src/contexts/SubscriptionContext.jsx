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
			return response.data.subscription
		},
		refetchOnWindowFocus: false,
		enabled: location.pathname === '/dashboard',
		staleTime: 1000 * 60 * 2,
		cacheTime: 1000 * 60 * 5,
		// onSuccess: data => {
	})

	const saveSubscriptionDetails = useMutation({
		mutationFn: async credentials => {
			const response = await axios.post(`${API_URL}/api/sub/details`, credentials, {
				withCredentials: true,
			})
			return response.data
		},
		onSuccess: data => {},
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
		]
	)

	return <SubscriptionContext.Provider value={providerValue}>{children}</SubscriptionContext.Provider>
}
