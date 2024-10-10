import React, { createContext, useState, useEffect } from 'react'
import { useQuery, useMutation } from 'react-query'
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
		refetch,
	} = useQuery(
		'authStatus',
		async () => {
			const queryParams = new URLSearchParams(location.search)
			const token = queryParams.get('token')
			const response = await axios.get(`/auth/status?token=${token}`, { withCredentials: true })
			console.log(response.data)
			return response.data
		},
		{
			refetchOnWindowFocus: false,
		}
	)

	useEffect(() => {
		if (authData) {
			setCurrentUser(authData.user)
		}
	}, [authData])

	const loginUser = useMutation(
		async credentials => {
			console.log(credentials)
			const response = await axios.post('/auth/login', credentials, { withCredentials: true })
			return response.data
		},
		{
			onSuccess: data => {
				setCurrentUser(data)
			},
		}
	)

	const registerUser = useMutation(
		async credentials => {
			console.log(credentials)
			const response = await axios.post('/auth/register', credentials, { withCredentials: true })
			return response.data
		},
		{
			onSuccess: data => {
				setCurrentUser(data)
			},
		}
	)

	const logoutUser = useMutation(
		async () => {
			await axios.post('/auth/logout', null, { withCredentials: true })
		},
		{
			onSuccess: () => {
				setCurrentUser(null)
			},
		}
	)

	const verifyCode = useMutation(
		async credentials => {
			const response = await axios.post('/auth/verify', credentials, { withCredentials: true })
			return response.data
		},
		{
			onSuccess: () => {
				refetch()
			},
		}
	)

	return (
		<AuthContext.Provider value={{ currentUser, loginUser, logoutUser, registerUser, isLoading, verifyCode }}>
			{children}
		</AuthContext.Provider>
	)
}
