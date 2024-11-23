import { QueryClient, useMutation } from '@tanstack/react-query'
import {
	loginUser as loginUserService,
	registerUser as registerUserService,
	logoutUser as logoutUserService,
	verifyCode as verifyCodeService,
} from '../services/authServices'
import { useState, useCallback } from 'react'
import { useAuthQuery } from './useAuthQuery'
import { queryClient } from '../main'

export const useAuthMutations = (setCurrentUser, navigate) => {
	const [authError, setAuthError] = useState({ email: '', code: '', password: '' })
	const { authRefetch } = useAuthQuery()

	const loginUser = useMutation({
		mutationFn: loginUserService,
		onSuccess: data => {
			setCurrentUser(data)
			setAuthError({ email: '', password: '', code: '' })
		},
		onError: error => {
			console.error(error.message)
		},
	})

	const registerUser = useMutation({
		mutationFn: registerUserService,
		onSuccess: data => {
			authRefetch()
		},
		onError: error => {
			setAuthError(prev => ({ ...prev, email: error.response?.data?.message }))
		},
	})

	const logoutUser = useMutation({
		mutationFn: logoutUserService,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: 'authStatus' })
			setCurrentUser({})
			navigate('/')
		},
		onError: error => {
			console.error('Error logging out:', error.message)
		},
	})

	const verifyCode = useMutation({
		mutationFn: verifyCodeService,
		onSuccess: () => {
			authRefetch()
		},
		onError: error => {
			setAuthError(prev => ({ ...prev, code: error.message }))
		},
	})

	return {
		loginUser,
		registerUser,
		logoutUser,
		verifyCode,
		authError,
		registerLoading: registerUser.status, // TO DELETION
	}
}
