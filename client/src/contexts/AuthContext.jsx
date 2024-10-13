import React, { createContext, useState, useEffect, useMemo } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from '../utils/axiosConfig'
import { useLocation, useNavigate } from 'react-router-dom'
import { set } from 'lodash'
import Cookies from 'js-cookie'
import { useSubscribe } from '../hooks/useSubscribe'

export const AuthContext = createContext()

const mode = import.meta.env.VITE_MODE
let API_URL = 'https://functional-form-module-1.onrender.com'
if (mode === 'development') {
	API_URL = 'http://localhost:4000'
}

export const AuthProvider = ({ children }) => {
	const location = useLocation()
	const [currentUser, setCurrentUser] = useState({
		email: '',
		isVerified: false,
		subscription: null,
		activeSub: null,
	})
	const [isLoading, setIsLoading] = useState(true)
	console.log('AuthProvider is running')
	console.log(currentUser)
	const {
		data: authData,
		isLoading: authIsLoading,
		isError,
		error,
		refetch,
	} = useQuery({
		queryKey: ['authStatus'],
		queryFn: async () => {
			console.log('authStatus queryFn is running')
			const token = new URLSearchParams(location.search).get('token')

			const response = await axios.get(`${API_URL}/api/auth/status?token=${token}`, {
				withCredentials: true,
			})
			return response.data
		},
		refetchOnWindowFocus: false,
		enabled: !!currentUser.email && location.pathname !== '/dashboard',
		staleTime: 1000 * 60 * 2,
		cacheTime: 1000 * 60 * 5,
	})

	useEffect(() => {
		if (authData) {
			setCurrentUser(authData.user)
		}
	}, [authData])

	const loginUser = useMutation({
		mutationFn: async credentials => {
			const response = await axios.post(`${API_URL}/api/auth/login`, credentials, {
				withCredentials: true,
			})
			return response.data
		},
		onSuccess: data => {
			console.log('loginUser mutationFn is running')
			setCurrentUser(data)
			refetch()
		},
		onError: error => {
			console.error('Error logging in:', error)
		},
	})

	const registerUser = useMutation({
		mutationFn: async credentials => {
			console.log('registerUser mutationFn is running')
			const response = await axios.post(`${API_URL}/api/auth/register`, credentials, {
				withCredentials: true,
			})
			return response.data
		},
		onSuccess: data => {
			console.log(data)
			setCurrentUser(data)
		},
		onError: error => {
			console.error('Error registering user:', error)
		},
	})

	const logoutUser = useMutation({
		mutationFn: async () => {
			await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true })
		},
		onSuccess: () => {
			setCurrentUser({
				email: '',
				isVerified: false,
				subscription: null,
				activeSub: null,
			})
		},
		onError: error => {
			console.error('Error logging out:', error)
		},
	})

	const verifyCode = useMutation({
		mutationFn: async credentials => {
			const response = await axios.post(`${API_URL}/api/auth/verify`, credentials, { withCredentials: true })
			return response
		},
		onSuccess: () => {
			refetch()
		},
		onError: error => {
			console.error('Error verifying code:', error)
		},
	})

	return (
		<AuthContext.Provider
			value={{ currentUser, loginUser, logoutUser, registerUser, authIsLoading, verifyCode, isLoading, refetch }}
		>
			{children}
		</AuthContext.Provider>
	)
}
