import React, { createContext, useState, useEffect, useMemo } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from '../utils/axiosConfig'
import { useLocation, useNavigate } from 'react-router-dom'
import { set } from 'lodash'
import Cookies from 'js-cookie'
import {
	getAuthStatus,
	loginUser as loginUserService,
	registerUser as registerUserService,
	logoutUser as logoutUserService,
	verifyCode as verifyCodeService,
} from '../services/authServices'

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

	const {
		data: userData,
		isLoading: authIsLoading,
		refetch,
	} = useQuery({
		queryKey: ['authStatus'],
		queryFn: async () => {
			const token = new URLSearchParams(location.search).get('token')
			return await getAuthStatus(token)
		},
		refetchOnWindowFocus: false,
		enabled:
			!authStatus &&
			(location.pathname === '/dashboard' || location.pathname === '/login' || location.pathname === '/subscription'),
		staleTime: 1000 * 60 * 2,
		cacheTime: 1000 * 60 * 5,
	})

	const loginUser = useMutation({
		mutationFn: loginUserService,
		onSuccess: data => {
			localStorage.setItem('currentUser', JSON.stringify(data))
			setCurrentUser(data)
			setAuthError({ email: '', password: '', code: '' })
		},
		onError: error => {
			const errorType = error.response?.data?.type
			const errorMessage = error.response?.data?.message
			setAuthError(prev => {
				const updatedErrors = { email: '', code: '', password: '' }
				updatedErrors[errorType] = errorMessage
				return updatedErrors
			})
			throw new Error('Error logging in: ' + errorMessage)
		},
	})

	const registerUser = useMutation({
		mutationFn: registerUserService,
		onSuccess: data => {
			// localStorage.setItem('currentUser', JSON.stringify(data))
			setCurrentUser(data)
			refetch()
		},
		onError: error => {
			const errorMessage = error.response?.data?.message
			setAuthError(prev => ({ ...prev, email: errorMessage }))
			throw new Error('Error registering user: ' + errorMessage)
		},
	})

	const logoutUser = useMutation({
		mutationFn: logoutUserService,
		onSuccess: () => {
			localStorage.removeItem('currentUser')
			navigate('/')
		},
		onError: error => {
			console.error('Error logging out:', error.message)
		},
	})

	const verifyCode = useMutation({
		mutationFn: verifyCodeService,
		onSuccess: () => {
			refetch()
		},
		onError: error => {
			const errorMessage = error.response?.data?.message
			setAuthError(prev => ({ ...prev, code: errorMessage }))
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
