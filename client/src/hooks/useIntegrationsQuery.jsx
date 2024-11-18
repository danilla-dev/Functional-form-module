import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'
import { getUserIntegrations } from '../services/integrationServices'
import { integrationOptions } from '../data/formsConstants'
import { useState, useEffect } from 'react'

export const useIntegrationsQuery = () => {
	const [userIntegrations, setUserIntegrations] = useState([])
	const location = useLocation()
	console.log('USER INTEGRATIONS', userIntegrations)

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

	const integrationsWithKeys = useMemo(() => {
		if (!userIntegrationsData) return []

		const integrationsPlatforms = userIntegrationsData.map(integration => integration.platform)
		const filteredIntegrations = integrationOptions.filter(option => integrationsPlatforms.includes(option.value))

		return filteredIntegrations.map(integration => {
			const apiKey = userIntegrationsData.find(
				integrationData => integrationData.platform === integration.value
			)?.apiKey
			return { ...integration, apiKey }
		})
	}, [userIntegrationsData])

	useEffect(() => {
		console.log('INTEGRATIONS WITH KEYS:', integrationsWithKeys)
		setUserIntegrations(integrationsWithKeys)
	}, [integrationsWithKeys])

	// useEffect(() => {
	// 	console.log('USER INTEGRATIONS DATA:', userIntegrationsData)
	// 	const integrationsPlatforms = userIntegrationsData?.map(integration => integration.platform)
	// 	const filteredIntegrations = integrationOptions.filter(option => {
	// 		return integrationsPlatforms?.includes(option.value)
	// 	})
	// 	console.log('FILTERED INTEGRATIONS:', filteredIntegrations)
	// 	const integrationsWithKeys = filteredIntegrations.map(integration => {
	// 		const apiKey = userIntegrationsData.find(integrationData => integrationData.platform === integration.value)
	// 		return { ...integration, apiKey: apiKey.apiKey }
	// 	})
	// 	console.log('INTEGRATIONS WITH KEYS:', integrationsWithKeys)
	// 	setUserIntegrations(integrationsWithKeys)
	// }, [userIntegrationsIsLoading, userIntegrationsData])

	return {
		userIntegrations,
		userIntegrationsIsLoading,
		userIntegrationsIsError,
		userIntegrationsError,
		setUserIntegrations,
		userIntegrationsRefetch,
	}
}
