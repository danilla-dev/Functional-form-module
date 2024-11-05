import React from 'react'
import { Stack } from '@chakra-ui/react'
import { useSubscribe } from '../../hooks/useSubscribe'
import { useAuth } from '../../hooks/useAuth'
import DashboardWidget from '../common/DashboardWidget'

const Account = () => {
	const { subscriptionDetails, subData } = useSubscribe()
	const { currentUser, authIsLoading, refetch: userRefetch } = useAuth()

	const { details, name, subscriptionEndDate } = subData || subscriptionDetails

	const normalDate = new Date(subscriptionEndDate)
	const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
	const formattedDate = normalDate.toLocaleDateString('pl-PL', options)

	const subWidgetContent = {
		header: 'Subscription Details',
		body: [
			{
				name: {
					description: 'Subscription Name',
					value: name,
				},
			},
			{
				status: {
					description: 'Subscription Status',
					value: currentUser.activeSub ? 'Active' : 'Inactive',
				},
			},
			{
				expDate: {
					description: 'Expiration Date',
					value: formattedDate,
				},
			},
		],
		dividerVisibility: true,
		fullWidth: true,
	}

	return (
		<Stack
			maxW={1600}
			w='100%'
			flexDir='row'
			flexWrap='wrap'
			justify={{ base: 'center', md: 'space-between' }}
			spacing='2em'
		>
			<DashboardWidget content={subWidgetContent} />
		</Stack>
	)
}

export default Account
