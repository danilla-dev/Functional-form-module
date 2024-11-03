import React, { createContext, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from '../utils/axiosConfig'
import { useLocation } from 'react-router-dom'
import { set } from 'lodash'
import Cookies from 'js-cookie'

export const AuthContext = createContext()

const isLoggedIn = Cookies.get('authStatus')

const mode = import.meta.env.VITE_MODE
const API_URL = mode === 'development' ? 'http://localhost:4000' : 'https://functional-form-module-1.onrender.com'

export const AuthProvider = ({ children }) => {
	const location = useLocation()
	const [authStatus, setAuthData] = useState(isLoggedIn)
	const [authError, setAuthError] = useState({ email: '', code: '' })
	const [currentUser, setCurrentUser] = useState({ email: '', isVerified: false, subscription: null, activeSub: null })

	console.log('auth status', authStatus)
	console.log(currentUser)
	const {
		data: userData,
		isLoading: authIsLoading,
		refetch,
	} = useQuery({
		queryKey: ['authStatus'],
		queryFn: async () => {
			const token = new URLSearchParams(location.search).get('token')
			const response = await axios.get(`${API_URL}/api/auth/status?token=${token}`, { withCredentials: true })
			console.log(response.data.user)
			return response.data.user
		},
		refetchOnWindowFocus: false,
		enabled: location.pathname !== '/dashboard' && !authStatus,
		staleTime: 1000 * 60 * 2,
		cacheTime: 1000 * 60 * 5,
		onSuccess: data => {
			setCurrentUser(data || { email: '', isVerified: false, subscription: null, activeSub: null })
		},
	})
	console.log('userData', userData)

	useEffect(() => {
		if (isLoggedIn === undefined) {
			Cookies.set('authStatus', 'false', { path: '/' })
		}
		if (authStatus === 'true') {
			refetch()
		}
		if (userData?.activeSub) {
			setCurrentUser(userData)
		}
	}, [refetch, userData, authStatus])

	const loginUser = useMutation({
		mutationFn: async credentials => {
			try {
				const response = await axios.post(`${API_URL}/api/auth/login`, credentials, { withCredentials: true })
				return response.data
			} catch (error) {
				throw new Error('Error logging in: ' + error.response?.data?.message)
			}
		},
		onSuccess: data => {
			localStorage.setItem('currentUser', JSON.stringify(data))
			setCurrentUser(data)
			refetch()
		},
		onError: error => {
			console.error(error.message)
		},
	})

	const registerUser = useMutation({
		mutationFn: async credentials => {
			try {
				const response = await axios.post(`${API_URL}/api/auth/register`, credentials, { withCredentials: true })
				return response.data
			} catch (error) {
				throw new Error('Error registering user: ' + error.response?.data?.message)
			}
		},
		onSuccess: data => {
			localStorage.setItem('currentUser', JSON.stringify(data))
			setCurrentUser(data)
			refetch()
		},
		onError: error => {
			setAuthError(prev => ({ ...prev, email: error.message }))
		},
	})

	const logoutUser = useMutation({
		mutationFn: async () => {
			await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true })
		},
		onSuccess: () => {
			setCurrentUser({ email: '', isVerified: false, subscription: null, activeSub: null })
			localStorage.removeItem('currentUser')
			refetch()
		},
		onError: error => {
			console.error('Error logging out:', error.message)
		},
	})

	const verifyCode = useMutation({
		mutationFn: async credentials => {
			try {
				const response = await axios.post(`${API_URL}/api/auth/verify`, credentials, { withCredentials: true })
				return response
			} catch (error) {
				throw new Error('Error verifying code: ' + error.response?.data?.message)
			}
		},
		onSuccess: () => {
			refetch()
		},
		onError: error => {
			setAuthError(prev => ({ ...prev, code: error.message }))
		},
	})

	return (
		<AuthContext.Provider
			value={{
				currentUser,
				loginUser,
				logoutUser,
				registerUser,
				authIsLoading,
				verifyCode,
				refetch,
				authError,
				authStatus,
				userData,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
