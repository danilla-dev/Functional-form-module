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
} from '@chakra-ui/react'

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
const SubWidget = ({ subDetails }) => {
	const { details, name, paymentStatus, price, subscriptionEndDate } = subDetails
	console.log(subDetails)
	return (
		<Box
			border='1px solid'
			borderColor='accent.200'
			p='2em'
			borderRadius={10}
			textAlign='left'
			justifyContent='flex-start'
			alignItems='start'
			h={250}
			w={350}
		>
			<VStack>
				<Box w='100%'>
					<Text fontSize='lg'>
						Name: <Text as='span'>{name}</Text>
					</Text>
				</Box>
				<Box w='100%'>
					<Text fontSize='md'>
						Price:{' '}
						<Text as='span' ml='.5em'>
							{price} $
						</Text>
					</Text>
				</Box>
				{details.preferences.map((pref, index) => {
					return (
						<Box key={index} w='100%'>
							<Text fontSize='md'>
								Preference {index + 1}:{' '}
								<Text as='span' ml='.5em'>
									{pref}
								</Text>
							</Text>
						</Box>
					)
				})}

				<Box w='100%'>
					<Text fontSize='md'>
						Subscription Status:
						<Text as='span' ml='.5em'>
							{paymentStatus}
						</Text>
					</Text>
				</Box>
				<Box w='100%'>
					<Text fontSize='md'>
						Subscription endDate:
						<Text as='span' ml='.5em'>
							{new Date(subscriptionEndDate).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
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

	console.log('currentUser', currentUser)
	console.log('subscriptionDetails', subscriptionDetails)
	console.log('dashboard is running')

	useEffect(() => {
		if (currentUser.email == '' || subscriptionDetails.name == '') {
			refetch()
			userRefetch()
		}
	}, [currentUser, subscriptionDetails, refetch, userRefetch])

	return (
		<Flex as='section' w='100vw' h='100vh' bgColor={'brand.300'} color={'white'} p='1em'>
			<HStack w='100%' justify='center' spacing='2em' align='baseline' pt={100}>
				{!currentUser.email ? (
					<Center h='100vh'>
						<Spinner size='xl' />
					</Center>
				) : (
					<>
						<UserWidget userDetails={currentUser} />
						<SubWidget subDetails={subscriptionDetails} />
					</>
				)}
			</HStack>
		</Flex>
	)
}

export default DashboardPage
