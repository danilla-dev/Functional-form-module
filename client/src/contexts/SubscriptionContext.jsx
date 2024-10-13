import React, { createContext, useState, useEffect, Children } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from '../utils/axiosConfig'
import { useAuth } from '../hooks/useAuth'

export const SubscriptionContext = createContext()

const mode = import.meta.env.VITE_MODE
let API_URL = 'https://functional-form-module-1.onrender.com'
if (mode === 'development') {
	API_URL = 'http://localhost:4000'
}

export const SubscriptionProvider = ({ children }) => {
	const [subscriptionDetails, setSubscriptionDetails] = useState(null)

	const saveSubscriptionDetails = useMutation({
		mutationFn: async credentials => {
			const response = await axios.post(`${API_URL}/api/sub/details`, credentials, {
				withCredentials: true,
			})
			return response.data
		},
		onSuccess: data => {
			setSubscriptionDetails(data)
		},
		onError: error => {
			console.error('Error setting subscription details:', error)
		},
	})

	return <SubscriptionContext.Provider value={{ saveSubscriptionDetails }}>{children}</SubscriptionContext.Provider>
}
