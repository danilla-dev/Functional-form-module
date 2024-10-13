import React, { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useSubscribe } from '../hooks/useSubscribe'
import { Center } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
const DashboardPage = () => {
	const { currentUser, authIsLoading, refetch: userRefetch } = useAuth()
	const { subscriptionDetails, subIsLoading, refetch } = useSubscribe()

	console.log('currentUser', currentUser)
	console.log('subscriptionDetails', subscriptionDetails)
	console.log('dashboard is running')

	useEffect(() => {
		if (currentUser.email == '' && subscriptionDetails.name == '') {
			refetch()
			userRefetch()
		}
	}, [currentUser, subscriptionDetails, refetch])

	return (
		<Center as='section' id='subscription-form' align='center' w='100%' h='100%' bgColor={'brand.300'} color={'white'}>
			{!currentUser.email ? (
				<Center h='100vh'>
					<Spinner size='xl' />
				</Center>
			) : (
				<>
					<h1>{currentUser.email}</h1>
					<h2>{currentUser.isVerified}</h2>
					<p>{subscriptionDetails.name}</p>
					<p>{subscriptionDetails.details.communicationStyle}</p>
					<p>{subscriptionDetails.details.communicationPreferences}</p>
					{subscriptionDetails.details.preferences.map((preference, index) => {
						return <p key={index}>{preference}</p>
					})}
				</>
			)}
		</Center>
	)
}

export default DashboardPage
