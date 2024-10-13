import { useContext } from 'react'
import { SubscriptionContext } from '../contexts/SubscriptionContext'
export const useSubscribe = () => {
	return useContext(SubscriptionContext)
}
