import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'
import { getSubscriptionDetails } from '../services/subServices'
import { useState, useEffect } from 'react'

export const useSubscriptionQuery = () => {
	const [subData, setSubData] = useState(null)
	const location = useLocation()

	const {
		data: subscriptionData,
		isLoading: subIsLoading,
		isError: subIsError,
		error: subError,
		refetch: subRefetch,
	} = useQuery({
		queryKey: ['subData'],
		queryFn: getSubscriptionDetails,
		refetchOnWindowFocus: false,
		enabled: location.pathname === '/dashboard',
		staleTime: 1000 * 60 * 2,
		cacheTime: 1000 * 60 * 5,
	})

	useEffect(() => {
		if (subscriptionData) {
			setSubData(subscriptionData)
		}
	}, [subscriptionData])

	return {
		subData: subscriptionData,
		subIsLoading,
		subIsError,
		subError,
		subRefetch,
	}
}
