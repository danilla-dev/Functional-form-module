import axios from '../utils/axiosConfig'

const mode = import.meta.env.VITE_MODE
const API_URL = mode === 'development' ? 'http://localhost:4000' : 'https://www.aiagent.petroweb.pl'

export const getSubscriptionDetails = async () => {
	const response = await axios.get(`${API_URL}/api/sub/details`, { withCredentials: true })
	return response.data.subscription
}

export const saveSubscriptionDetails = async credentials => {
	const response = await axios.post(`${API_URL}/api/sub/details`, credentials, { withCredentials: true })
	return response.data
}

export const payForSubscription = async credentials => {
	const response = await axios.post(`${API_URL}/api/payment/`, credentials, { withCredentials: true })
	return response.data
}
