import api from '../utils/axiosConfig'


export const createUser = async data => {
	try {
		const response = await api.post(`${API_URL}/api/user/create`, data)
		return response.data
	} catch (error) {
		console.error('Error creating user:', error.response?.data?.message || 'Failed to create user')
		console.log(error)
		throw new Error(error.response?.data?.message || 'Failed to create user')
	}
}

export const loginUser = async data => {
	try {
		const response = await api.post('/user/login', data)
		return response.data
	} catch (error) {
		console.error('Error logging in:', error.response?.data?.message || 'Failed to log in')
		return { error: error.response?.data?.message || 'Failed to log in' }
	}
}

export const fetchUser = async () => {
	try {
		const response = await api.get(`${API_URL}/api/user/status`)
		return response.data
	} catch (error) {
		console.error('Error fetching user:', error.response?.data?.message || 'Failed to fetch user data')
		return { error: error.response?.data?.message || 'Failed to fetch user data' }
	}
}
