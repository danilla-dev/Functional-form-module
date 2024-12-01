import { useMutation } from '@tanstack/react-query'
import {
	postIntegration as postIntegrationService,
	deleteIntegration as deleteIntegrationService,
	updateIntegration as updateIntegrationService,
} from '../services/integrationServices'
import { integrationOptions } from '../data/formsConstants'
import { useState, useCallback } from 'react'

export const useIntegrationsMutations = setUserIntegrations => {
	const postIntegration = useMutation({
		mutationFn: postIntegrationService,
		onSuccess: data => {
			console.log('Integration created:', data)
			let newIntegration = integrationOptions.find(option => option.value === data.integration)
			newIntegration = { ...newIntegration, apiKey: data.integrationKey }
			setUserIntegrations(prevData => [...prevData, newIntegration])
		},
		onError: error => {
			console.error('Error creating integration:', error.response?.data?.message || error.message)
		},
	})

	const updateApiKey = useMutation({
		mutationFn: updateIntegrationService,
		onSuccess: data => {
			console.log('Integration updated:', data)
			setUserIntegrations(prevData =>
				prevData.map(integration =>
					integration.value === data.integration ? { ...integration, apiKey: data.integrationKey } : integration
				)
			)
		},
		onError: error => {
			console.error('Error updating integration:', error.response?.data?.message || error.message)
		},
	})

	const deleteIntegration = useMutation({
		mutationFn: deleteIntegrationService,
		onSuccess: data => {
			setUserIntegrations(prevData => prevData.filter(integration => integration.value !== data.integration))
		},
		onError: error => {
			console.error('Error deleting integration:', error.response?.data?.message || error.message)
		},
	})

	const handleSaveIntegration = useCallback(async ({ data, postIntegration }) => {
		console.log('data in handler', data)
		try {
			const result = await postIntegration.mutateAsync(data)
			console.log('Integration details saved:', result)
		} catch (error) {
			console.error('Failed to save integration details:', error)
		}
	}, [])

	const handleDeleteIntegration = useCallback(async ({ platform, deleteIntegration }) => {
		try {
			const result = await deleteIntegration.mutateAsync(platform)
			console.log('Integration deleted:', result)
		} catch (error) {
			console.error('Failed to delete integration:', error)
		}
	}, [])

	const handleUpdateApiKey = useCallback(async ({ data, updateApiKey }) => {
		try {
			const result = await updateApiKey.mutateAsync(data)
			console.log('Integration updated:', result)
		} catch (error) {
			console.error('Failed to update integration:', error)
		}
	}, [])

	return {
		postIntegration,
		updateApiKey,
		deleteIntegration,
		handleSaveIntegration,
		handleDeleteIntegration,
		handleUpdateApiKey,
		postIntegrationLoading: postIntegration.status,
		updateApiKeyLoading: updateApiKey.status,
		deleteIntegrationLoading: deleteIntegration.status,
	}
}
