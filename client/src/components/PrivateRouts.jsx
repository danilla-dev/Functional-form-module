import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useSubscribe } from '../hooks/useSubscribe'

import Cookies from 'js-cookie'

const PrivateRouts = ({ element }) => {
	const { currentUser, authIsLoading, authData } = useAuth()
	const { subscriptionDetails, subIsLoading } = useSubscribe()
	const [isLoggedIn, setIsLoggedIn] = useState(null)

	useEffect(() => {
		const authStatus = Cookies.get('authStatus') === 'true'
		setIsLoggedIn(authStatus)
	}, [])

	if (authIsLoading || subIsLoading) {
		return <div>Loading...</div>
	}
	if (isLoggedIn === null) {
		return <div>Checking authentication...</div>
	}
	if (!isLoggedIn) {
		return <Navigate to='/' />
	}

	return element
}
export default PrivateRouts
