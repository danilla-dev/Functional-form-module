import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useSubscribe } from '../hooks/useSubscribe'

const PrivateRouts = ({ element }) => {
	const { currentUser, isLoading } = useAuth()
	const { subscriptionDetails } = useSubscribe()

	if (!isLoading) {
		if (!currentUser.email) {
			return <Navigate to='/' />
		}
	}

	return element
}
export default PrivateRouts
