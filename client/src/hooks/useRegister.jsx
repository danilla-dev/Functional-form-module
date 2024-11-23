// // src/hooks/useRegister.js
// import { useState } from 'react'
// import { createUser } from '../api/authApi'
// import { useAuth } from '../hooks/useAuth'
// import { set } from 'lodash'

// const useRegister = () => {
// 	const [loading, setLoading] = useState(false)
// 	const [error, setError] = useState(null)
// 	const { login } = useAuth()

// 	const handleRegister = async userData => {
// 		setLoading(true)
// 		setError(null)
// 		try {
// 			const { result, token } = await createUser(userData)
// 			login(result)
// 			setError(null)
// 			localStorage.setItem('authToken', token)
// 			return 'success'
// 		} catch (err) {
// 			setError(err)
// 			return err.message
// 		} finally {
// 			setLoading(false)
// 		}
// 	}

// 	return { handleRegister, loading, error }
// }

// export default useRegister
