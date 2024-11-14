import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'
import { getUserIntegrations } from '../services/integrationServices'
import { integrationOptions } from '../data/formsConstants'
import { useState, useEffect } from 'react'

export const useIntegrationsQuery = () => {
	const [userIntegrations, setUserIntegrations] = useState([])
	const location = useLocation()

	const {
		data: userIntegrationsData,
		isLoading: userIntegrationsIsLoading,
		isError: userIntegrationsIsError,
		error: userIntegrationsError,
		refetch: userIntegrationsRefetch,
	} = useQuery({
		queryKey: ['userIntegrations'],
		queryFn: getUserIntegrations,
		refetchOnWindowFocus: false,
		enabled: location.pathname === '/dashboard',
		staleTime: 1000 * 60 * 2,
		cacheTime: 1000 * 60 * 5,
		onSuccess: data => {
			console.log('Success:', data)
			setUserIntegrations(data)
		},
		onError: error => {
			console.log('Error:', error)
			console.error('Error getting user integrations:', error.response?.data?.message || error.message)
		},
	})

	useEffect(() => {
		const filteredIntegrations = integrationOptions.filter(option => userIntegrationsData?.includes(option.value))
		setUserIntegrations(filteredIntegrations)
	}, [userIntegrationsIsLoading, userIntegrationsData])

	return {
		userIntegrations,
		userIntegrationsIsLoading,
		userIntegrationsIsError,
		userIntegrationsError,
		setUserIntegrations,
		userIntegrationsRefetch,
	}
}
