import React, { createContext, useMemo } from 'react'
import { useSubscriptionQuery } from '../hooks/useSubscriptionQuery'
import { useSubscriptionMutations } from '../hooks/useSubscriptionMutations'
import { pricingOptions } from '../data/mainSectionConstants'

export const SubscriptionContext = createContext()

export const SubscriptionProvider = ({ children }) => {
	const { subData, subIsLoading, subIsError, subError, subRefetch } = useSubscriptionQuery()

	const { saveSubscriptionDetails, payForSubscription, handleSaveDetails, handlePayment } = useSubscriptionMutations()

	const providerValue = useMemo(
		() => ({
			saveSubscriptionDetails,
			payForSubscription,
			subIsLoading,
			subRefetch,
			pricingOptions,
			subData,
			handleSaveDetails,
			handlePayment,
		}),
		[
			saveSubscriptionDetails,
			payForSubscription,
			subIsLoading,
			subRefetch,
			pricingOptions,
			subData,
			handleSaveDetails,
			handlePayment,
		]
	)

	return <SubscriptionContext.Provider value={providerValue}>{children}</SubscriptionContext.Provider>
}

// import React, { createContext, useState, useEffect, useMemo } from 'react'
// import { useQuery, useMutation } from '@tanstack/react-query'
// import axios from '../utils/axiosConfig'
// import { useLocation } from 'react-router-dom'
// import { pricingOptions } from '../data/mainSectionConstants'
// import { set } from 'lodash'
// import {
// 	getSubscriptionDetails,
// 	saveSubscriptionDetails as saveSubscriptionDetailsService,
// 	payForSubscription as payForSubscriptionService,
// } from '../services/subServices'
// export const SubscriptionContext = createContext()

// const mode = import.meta.env.VITE_MODE
// let API_URL = 'https://www.aiagent.petroweb.pl'
// if (mode === 'development') {
// 	API_URL = 'http://localhost:4000'
// }

// export const SubscriptionProvider = ({ children }) => {
// 	const location = useLocation()

// 	const {
// 		data: subData,
// 		isLoading: subIsLoading,
// 		isError,
// 		error,
// 		refetch,
// 	} = useQuery({
// 		queryKey: ['subData'],
// 		queryFn: getSubscriptionDetails,
// 		refetchOnWindowFocus: false,
// 		enabled: location.pathname === '/dashboard',
// 		staleTime: 1000 * 60 * 2,
// 		cacheTime: 1000 * 60 * 5,
// 	})

// 	const saveSubscriptionDetails = useMutation({
// 		mutationFn: saveSubscriptionDetailsService,
// 		onSuccess: data => {},
// 		onError: error => {
// 			console.error('Error setting subscription details:', error.response?.data?.message || error.message)
// 		},
// 	})

// 	const payForSubscription = useMutation({
// 		mutationFn: payForSubscriptionService,
// 		onSuccess: async paymentIntent => {
// 			const { url } = paymentIntent
// 			window.location.href = url
// 		},
// 		onError: error => {
// 			console.error('Error paying for subscription:', error.response?.data?.message || error.message)
// 		},
// 	})

// 	const providerValue = useMemo(
// 		() => ({
// 			saveSubscriptionDetails,
// 			payForSubscription,
// 			subIsLoading,
// 			refetch,
// 			pricingOptions,
// 			subData,
// 		}),
// 		[saveSubscriptionDetails, payForSubscription, subIsLoading, refetch, pricingOptions, subData]
// 	)

// 	return <SubscriptionContext.Provider value={providerValue}>{children}</SubscriptionContext.Provider>
// }
