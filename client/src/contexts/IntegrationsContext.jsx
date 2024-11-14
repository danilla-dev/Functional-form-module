import React, { createContext, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { integrationSchema } from '../utils/YupSchemas'
import { useIntegrationsQuery } from '../hooks/useIntegrationsQuery'
import { useIntegrationsMutations } from '../hooks/useIntegrationsMutations'

export const IntegrationsContext = createContext()

export const IntegrationsProvider = ({ children }) => {
	const {
		userIntegrations,
		userIntegrationsIsLoading,
		userIntegrationsIsError,
		userIntegrationsError,
		userIntegrationsRefetch,
		setUserIntegrations,
	} = useIntegrationsQuery()

	const { postIntegration, deleteIntegration, handleSaveIntegration, handleDeleteIntegration } =
		useIntegrationsMutations(setUserIntegrations)

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

	const onSubmit = async formData => {
		if (formData) {
			await handleSaveIntegration({ data: formData, postIntegration })
		}
	}

	const onDeletion = async platform => {
		console.log('platform to delete:', platform)
		await handleDeleteIntegration({ platform, deleteIntegration })
	}

	const providerValue = useMemo(
		() => ({
			onSubmit,
			userIntegrations,
			postIntegration,
			userIntegrationsRefetch,
			handleSubmit,
			control,
			errors,
			setValue,
			watch,
			onDeletion,
			userIntegrationsIsLoading,
		}),
		[
			onSubmit,
			userIntegrations,
			postIntegration,
			userIntegrationsRefetch,
			handleSubmit,
			control,
			errors,
			userIntegrationsIsLoading,
			onDeletion,
		]
	)

	return <IntegrationsContext.Provider value={providerValue}>{children}</IntegrationsContext.Provider>
}
