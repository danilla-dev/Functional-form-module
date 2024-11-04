import { useState, useEffect } from 'react'
import { fetchUser as fetchUserApi } from '../api/authApi'
import { useAuth } from './useAuth'
import { useSubscribe } from './useSubscribe'
import { integrationOptions } from '../data/formsConstants'
import { handleSaveIntegration } from '../handlers/subscriptionHandlers'

const useIntegrations = () => {
	const { userIntegrations, setUserIntegrations, postIntegration } = useSubscribe()
	const [platform, setPlatform] = useState('')
	const [apiKey, setApiKey] = useState('')

	const integrations = integrationOptions.filter(option => userIntegrations.includes(option.value))

	const handleAddIntegration = newIntegration => {
		setUserIntegrations([...userIntegrations, newIntegration.platform])
	}

	const data = {
		platform,
		apiKey,
	}
	const handleSubmit = async e => {
		e.preventDefault()
		if (platform && apiKey) {
			await handleSaveIntegration({ data, postIntegration })
			setPlatform('')
			setApiKey('')
		}
	}
	return { handleAddIntegration, integrations, handleSubmit, platform, setPlatform, apiKey, setApiKey }
}

export default useIntegrations
