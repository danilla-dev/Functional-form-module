import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'
import { getAuthStatus } from '../services/authServices'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

const isLoggedIn = Cookies.get('authStatus') === 'true'

export const useAuthQuery = () => {
	const [authStatus, setAuthData] = useState(isLoggedIn)
	const location = useLocation()

	const {
		data: userData,
		isLoading: authIsLoading,
		isError: authIsError,
		error: authError,
		refetch: authRefetch,
	} = useQuery({
		queryKey: ['authStatus'],
		queryFn: async () => {
			const token = new URLSearchParams(location.search).get('token')
			return await getAuthStatus(token)
		},
		refetchOnWindowFocus: false,
		enabled:
			location.pathname === '/dashboard' || location.pathname === '/login' || location.pathname === '/subscription',
		staleTime: 1000 * 60 * 2,
		cacheTime: 1000 * 60 * 5,
	})


	return {
		authIsLoading,
		authIsError,
		authError,
		authRefetch,
		userData,
	}
}
