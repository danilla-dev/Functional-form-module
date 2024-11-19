import axios from '../utils/axiosConfig'

const mode = import.meta.env.VITE_MODE
const API_URL = mode === 'development' ? 'http://localhost:4000' : 'https://www.aiagent.petroweb.pl'

export const getUserIntegrations = async () => {
	const response = await axios.get(`${API_URL}/api/integrations`, { withCredentials: true })
	console.log('getUserIntegrations response:', response.data.integrations)
	return response.data.integrations
}

export const postIntegration = async credentials => {
	const response = await axios.post(`${API_URL}/api/integrations`, credentials, { withCredentials: true })
	return response.data
}

export const deleteIntegration = async platform => {
	const response = await axios.delete(`${API_URL}/api/integrations`, {
		data: { platform },
		withCredentials: true,
	})
	return response.data
}

export const updateIntegration = async credentials => {
	const response = await axios.patch(`${API_URL}/api/integrations`, credentials, { withCredentials: true })
	console.log('updateIntegration response:', response.data)
	return response.data
}
// const {
// 	data: userIntegrationsData,
// 	isLoading: userIntegrationsIsLoading,
// 	isError: userIntegrationsIsError,
// 	error: userIntegrationsError,
// 	refetch: userIntegrationsRefetch,
// } = useQuery({
// 	queryKey: ['userIntegrations'],
// 	queryFn: async () => {
// 		const response = await axios.get(`${API_URL}/api/integrations`, {
// 			withCredentials: true,
// 		})
// 		setUserIntegrations(response.data.integrations)
// 		return response.data.integrations
// 	},
// 	refetchOnWindowFocus: false,
// 	enabled: location.pathname === '/dashboard',
// 	staleTime: 1000 * 60 * 2,
// 	cacheTime: 1000 * 60 * 5,
// 	onSuccess: data => {
// 		setUserIntegrations(data.integration)
// 	},
// })
