import { useContext } from 'react'
import { IntegrationsContext } from '../contexts/IntegrationsContext'

export const userIntegrations = () => {
	return useContext(IntegrationsContext)
}
