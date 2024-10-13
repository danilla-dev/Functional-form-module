import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { useSubscribe } from '../hooks/useSubscribe'
import { Center, Spinner } from '@chakra-ui/react'

const DashboardPage = () => {
	const { currentUser, authIsLoading } = useAuth()
	const { subscriptionDetails, subIsLoading } = useSubscribe()

	console.log(subIsLoading)

	return (
		<Center as='section' id='subscription-form' align='center' w='100%' h='100%' bgColor={'brand.300'} color={'white'}>
			{subIsLoading ? (
				<Center h='100vh'>
					<Spinner size='xl' />
				</Center>
			) : (
				<>
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
