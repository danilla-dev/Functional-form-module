import React, { createContext, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from '../utils/axiosConfig'
import { useLocation, useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const location = useLocation()
	const navigate = useNavigate()
	const [currentUser, setCurrentUser] = useState(null)

	console.log(currentUser && currentUser)

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

			const response = await axios.get(`/auth/status?token=${token}`, {
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
			console.log(credentials)
			const response = await axios.post('/auth/login', credentials, {
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
			console.log(credentials)
			const response = await axios.post('/auth/register', credentials, {
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
			await axios.post('/auth/logout', null, { withCredentials: true })
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
			const response = await axios.post('/auth/verify', credentials, { withCredentials: true })
			console.log(response)
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
