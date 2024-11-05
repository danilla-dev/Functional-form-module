import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useSubscribe } from '../hooks/useSubscribe'
import Cookies from 'js-cookie'

const PrivateRouts = ({ element }) => {
	const { currentUser, authIsLoading } = useAuth()
	const { subscriptionDetails, subIsLoading } = useSubscribe()
	const authStatus = Cookies.get('authStatus') === 'true'

	if (authIsLoading) {
		return <div>Checking authentication...</div>
	}

	if (!authStatus) {
		return <Navigate to='/' />
	}

	return element
}

export default PrivateRouts
