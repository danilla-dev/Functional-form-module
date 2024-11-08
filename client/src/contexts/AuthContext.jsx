import React, { createContext, useState, useEffect, useMemo } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from '../utils/axiosConfig'
import { useLocation, useNavigate } from 'react-router-dom'
import { set } from 'lodash'
import Cookies from 'js-cookie'

export const AuthContext = createContext()

const isLoggedIn = Cookies.get('authStatus')

const mode = import.meta.env.VITE_MODE
const API_URL = mode === 'development' ? 'http://localhost:4000' : 'https://www.aiagent.petroweb.pl'

export const AuthProvider = ({ children }) => {
	const location = useLocation()
	const navigate = useNavigate()
	const [authStatus, setAuthData] = useState(isLoggedIn)
	const [authError, setAuthError] = useState({ email: '', code: '', password: '' })
	const [currentUser, setCurrentUser] = useState({ email: '', isVerified: false, subscription: null, activeSub: null })

	console.log('AuthProvider is rendering')

	const {
		data: userData,
		isLoading: authIsLoading,
		refetch,
	} = useQuery({
		queryKey: ['authStatus'],
		queryFn: async () => {
			const token = new URLSearchParams(location.search).get('token')
			const response = await axios.get(`${API_URL}/api/auth/status?token=${token}`, { withCredentials: true })
			console.log('POBRANO DANE USERA:', response.data.user)
			return response.data.user
		},
		refetchOnWindowFocus: false,
		enabled:
			!authStatus &&
			(location.pathname === '/dashboard' || location.pathname === '/login' || location.pathname === '/subscription'),
		staleTime: 1000 * 60 * 2,
		cacheTime: 1000 * 60 * 5,
		onSuccess: data => {
			setCurrentUser(data || { email: '', isVerified: false, subscription: null, activeSub: null })
		},
	})

	const loginUser = useMutation({
		mutationFn: async credentials => {
			try {
				const response = await axios.post(`${API_URL}/api/auth/login`, credentials, { withCredentials: true })
				return response.data
			} catch (error) {
				const errorType = error.response?.data?.type
				const errorMessage = error.response?.data?.message
				setAuthError(prev => {
					const updatedErrors = { email: '', code: '', password: '' }
					updatedErrors[errorType] = errorMessage
					return updatedErrors
				})
				throw new Error('Error logging in: ' + errorMessage)
			}
		},
		onSuccess: data => {
			localStorage.setItem('currentUser', JSON.stringify(data))
			setCurrentUser(data)
			setAuthError({ email: '', password: '', code: '' })
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
				const errorMessage = error.response?.data?.message
				throw new Error('Error registering user: ' + errorMessage)
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
			localStorage.removeItem('currentUser')
			navigate('/')
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

	const providerValue = useMemo(
		() => ({
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
		}),
		[
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
		]
	)

	return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>
}
