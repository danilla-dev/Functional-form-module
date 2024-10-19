import React, { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useSubscribe } from '../hooks/useSubscribe'
import {
	Text,
	Box,
	Center,
	Stepper,
	StepDescription,
	StepIcon,
	StepIndicator,
	StepNumber,
	StepSeparator,
	StepStatus,
	StepTitle,
	useSteps,
	ButtonGroup,
	Image,
	Stack,
	useToast,
	HStack,
	Spinner,
	VStack,
	Container,
	Flex,
	Grid,
	GridItem,
} from '@chakra-ui/react'
import DashboardWidget from './DashboardWidget'
import { divide } from 'lodash'

const UserWidget = ({ userDetails }) => {
	const { email, isVerified, activeSub } = userDetails
	return (
		<Box
			border='1px solid'
			borderColor='accent.200'
			p='2em'
			borderRadius={10}
			textAlign='left'
			justifyContent='flex-start'
			alignItems='start'
			h={150}
			w={250}
		>
			<VStack>
				<Box w='100%'>
					<Text fontSize='lg'>{email}</Text>
				</Box>
				<Box w='100%'>
					<Text fontSize='md'>
						Verification status:{' '}
						<Text as='span' ml='.5em'>
							{isVerified.toString()}
						</Text>
					</Text>
				</Box>
				<Box w='100%'>
					<Text fontSize='md'>
						Subscription Status:
						<Text as='span' ml='.5em'>
							{activeSub.toString()}
						</Text>
					</Text>
				</Box>
			</VStack>
		</Box>
	)
}

const DashboardPage = () => {
	const { currentUser, authIsLoading, refetch: userRefetch } = useAuth()
	const { subscriptionDetails, subIsLoading, refetch } = useSubscribe()
	const { details, name, subscriptionEndDate } = subscriptionDetails

	console.log('currentUser', currentUser)
	console.log('subscriptionDetails', subscriptionDetails)
	console.log('dashboard is running')

	useEffect(() => {
		if (currentUser.email == '' || subscriptionDetails.name == '') {
			refetch()
			userRefetch()
		}
	}, [currentUser, subscriptionDetails, refetch, userRefetch])

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
	const communicationWidgetContent = {
		header: 'Communication',
		body: [
			{
				time: {
					description: 'Report interval',
					value: details.communicationPreferences,
				},
			},
			{
				style: {
					description: 'Report style',
					value: details.communicationStyle,
				},
			},
		],
		dividerVisibility: true,
		fullWidth: false,
	}
	const usagePreferencesWidgetContent = {
		header: 'Usage Preferences',
		body: details.preferences,
		dividerVisibility: false,
		fullWidth: false,
	}
	return (
		<Flex
			as='section'
			id='dashboard'
			maxW='100vw'
			minH='100vh'
			h='100%'
			bgColor={'brand.200'}
			color={'white'}
			p='1em'
			pt='3em'
		>
			<Container m={0} centerContent p='0 2em' minW='100%' pb='3em'>
				<Stack
					maxW={1400}
					w='100%'
					flexDir='row'
					flexWrap='wrap'
					justify={{ base: 'center', md: 'space-between' }}
					spacing='2em'
				>
					<DashboardWidget content={subWidgetContent} />
					<DashboardWidget content={communicationWidgetContent} />
					<DashboardWidget content={usagePreferencesWidgetContent} />
				</Stack>
			</Container>
		</Flex>
	)
}

export default DashboardPage
