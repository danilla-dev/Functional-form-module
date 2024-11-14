import axios from '../utils/axiosConfig'

const mode = import.meta.env.VITE_MODE
const API_URL = mode === 'development' ? 'http://localhost:4000' : 'https://www.aiagent.petroweb.pl'

export const getAuthStatus = async token => {
	const response = await axios.get(`${API_URL}/api/auth/status?token=${token}`, { withCredentials: true })
	return response.data.user
}

export const loginUser = async credentials => {
	const response = await axios.post(`${API_URL}/api/auth/login`, credentials, { withCredentials: true })
	return response.data
}

export const registerUser = async credentials => {
	const response = await axios.post(`${API_URL}/api/auth/register`, credentials, { withCredentials: true })
	return response.data
}

export const logoutUser = async () => {
	await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true })
}

export const verifyCode = async credentials => {
	const response = await axios.post(`${API_URL}/api/auth/verify`, credentials, { withCredentials: true })
	return response
}
