import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { useSubscribe } from '../hooks/useSubscribe'

const DashboardPage = () => {
	const { currentUser } = useAuth()
	const { subscriptionDetails } = useSubscribe()
	console.log(subscriptionDetails)

	return (
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
	)
}

export default DashboardPage
