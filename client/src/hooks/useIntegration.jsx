import { useContext } from 'react'
import { IntegrationsContext } from '../contexts/IntegrationsContext'

export const useIntegration = () => {
	return useContext(IntegrationsContext)
}
