import React, { createContext, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from '../utils/axiosConfig'
import { useLocation, useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

const mode = import.meta.env.VITE_MODE
let API_URL = 'https://functional-form-module-1.onrender.com'
if (mode === 'development') {
	API_URL = 'http://localhost:4000'
}

export const AuthProvider = ({ children }) => {
	const location = useLocation()
	const navigate = useNavigate()
	const [currentUser, setCurrentUser] = useState(null)

	const {
		data: authData,
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery({
		queryKey: ['authStatus', location.search], // użycie queryKey
		queryFn: async () => {
			const queryParams = new URLSearchParams(location.search)
			const token = queryParams.get('token')

			const response = await axios.get(`${API_URL}/api/auth/status?token=${token}`, {
				withCredentials: true,
			})
			return response.data
		},
		refetchOnWindowFocus: false,
		enabled: !!location.search,
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
			setCurrentUser(data)
		},
		onError: error => {
			console.error('Error logging in:', error)
		},
	})

	const registerUser = useMutation({
		mutationFn: async credentials => {
			const response = await axios.post(`${API_URL}/api/auth/register`, credentials, {
				withCredentials: true,
			})
			return response.data
		},
		onSuccess: data => {
			setCurrentUser(data)
		},
		onError: error => {
			console.error('Error registering user:', error)
		},
	})

	const logoutUser = useMutation({
		mutationFn: async () => {
			await axios.post(`${API_URL}/api/auth/logout`, null, { withCredentials: true })
		},
		onSuccess: () => {
			setCurrentUser(null)
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
			refetch() // Odświeżenie danych po udanej weryfikacji
		},
		onError: error => {
			console.error('Error verifying code:', error)
		},
	})

	return (
		<AuthContext.Provider value={{ currentUser, loginUser, logoutUser, registerUser, isLoading, verifyCode }}>
			{children}
		</AuthContext.Provider>
	)
}
