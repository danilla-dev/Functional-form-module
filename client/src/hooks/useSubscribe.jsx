import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

const useSubscribe = () => {
	const { currentUser } = useAuth()
	return <div>useSubscribe</div>
}

export default useSubscribe
