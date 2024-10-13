import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useSubscribe } from '../hooks/useSubscribe'

const PrivateRouts = ({ element }) => {
	const { currentUser } = useAuth()
	const { subscriptionDetails } = useSubscribe()

	if (!currentUser) {
		return <Navigate to='/' />
	}

	return element
}
export default PrivateRouts
