import { useState, useEffect } from 'react'
import { fetchUser as fetchUserApi } from '../api/authApi' // Zmiana nazwy
import { useAuth } from './useAuth' // Jeśli używasz kontekstu auth

const useFetchUser = () => {
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState(null)

	const fetchUser = async () => {
		try {
			const response = await fetchUserApi()
			setUser(response)
		} catch (err) {
			setError(err.response?.data?.message || 'Failed to fetch user data')
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		fetchUser()
	}, [])

	return { user, error, loading }
}

export default useFetchUser
