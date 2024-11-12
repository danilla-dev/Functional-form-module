import React, { createContext, useState, useEffect, useMemo } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from '../utils/axiosConfig'
import { useLocation } from 'react-router-dom'
import { integrationOptions } from '../data/formsConstants'
import { handleSaveIntegration, handleDeleteIntegration } from '../handlers/subscriptionHandlers'

import { pricingOptions } from '../data/mainSectionConstants'
import { set } from 'lodash'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { integrationSchema } from '../utils/YupSchemas'

export const IntegrationsContext = createContext()

const mode = import.meta.env.VITE_MODE
let API_URL = 'https://www.aiagent.petroweb.pl'
if (mode === 'development') {
	API_URL = 'http://localhost:4000'
}

export const IntegrationsProvider = ({ children }) => {
	const [userIntegrations, setUserIntegrations] = useState([])
	const [platform, setPlatform] = useState('')
	const [apiKey, setApiKey] = useState('')
	const location = useLocation()

	const integrations = integrationOptions.filter(option => userIntegrations.includes(option.value))

	const data = {
		platform,
		apiKey,
	}

	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
		setValue,
		watch,
	} = useForm({
		resolver: yupResolver(integrationSchema),
		defaultValues: {
			platform: '',
			apiKey: '',
		},
	})

	const handleAddIntegration = newIntegration => {
		setUserIntegrations([...userIntegrations, newIntegration.platform])
	}
	const handlePlatformChange = (value, field) => {
		field.onChange(value)
		setPlatform(value)
	}

	const handleApiKeyChange = (value, field) => {
		field.onChange(value)
		setApiKey(value)
	}

	const onSubmit = async e => {
		console.log(platform, apiKey)
		if (platform && apiKey) {
			await handleSaveIntegration({ data, postIntegration })
			setPlatform('')
			setApiKey('')
		}
	}
	const onDeletion = async platform => {
		await handleDeleteIntegration({ platform, deleteIntegration })
	}
	const {
		data: userIntegrationsData,
		isLoading: userIntegrationsIsLoading,
		isError: userIntegrationsIsError,
		error: userIntegrationsError,
		refetch: userIntegrationsRefetch,
	} = useQuery({
		queryKey: ['userIntegrations'],
		queryFn: async () => {
			const response = await axios.get(`${API_URL}/api/integrations`, {
				withCredentials: true,
			})
			setUserIntegrations(response.data.integrations)
			return response.data.integrations
		},
		refetchOnWindowFocus: false,
		enabled: location.pathname === '/dashboard',
		staleTime: 1000 * 60 * 2,
		cacheTime: 1000 * 60 * 5,
		onSuccess: data => {
			setUserIntegrations(data)
		},
	})

	const postIntegration = useMutation({
		mutationFn: async credentials => {
			const response = await axios.post(`${API_URL}/api/integrations`, credentials, {
				withCredentials: true,
			})
			return response.data
		},
		onSuccess: data => {
			setUserIntegrations(prevData => [...prevData, data.integration])
		},
		onError: error => {
			console.error('Error creating integration:', error.response?.data?.message || error.message)
		},
	})

	const deleteIntegration = useMutation({
		mutationFn: async platform => {
			const response = await axios.delete(`${API_URL}/api/integrations`, {
				data: { platform },
				withCredentials: true,
			})
			return response.data
		},
		onSuccess: data => {
			setUserIntegrations(prevData => prevData.filter(integration => integration !== data.integration))
		},
		onError: error => {
			console.error('Error deleting integration:', error.response?.data?.message || error.message)
		},
	})

	const providerValue = useMemo(
		() => ({
			handleAddIntegration,
			integrations,
			onSubmit,
			platform,
			setPlatform,
			apiKey,
			setApiKey,
			userIntegrations,
			postIntegration,
			userIntegrationsRefetch,
			handleSubmit,
			control,
			errors,
			handlePlatformChange,
			handleApiKeyChange,
			setValue,
			watch,
			onDeletion,
		}),
		[
			handleAddIntegration,
			integrations,
			onSubmit,
			platform,
			setPlatform,
			apiKey,
			setApiKey,
			userIntegrations,
			postIntegration,
			userIntegrationsRefetch,
			handleSubmit,
			control,
			errors,
		]
	)

	return <IntegrationsContext.Provider value={providerValue}>{children}</IntegrationsContext.Provider>
}
