import React, { useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useSubscribe } from '../../hooks/useSubscribe'
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
import DashboardWidget from '../common/DashboardWidget'
import Footer from '../Footer'
import DashboardMenuLinks from '../common/DashboardMenuLinks'

const DashboardPage = () => {
	const { currentUser, authIsLoading, refetch: userRefetch } = useAuth()
	const { subscriptionDetails, subIsLoading, refetch } = useSubscribe()
	const { details, name, subscriptionEndDate } = subscriptionDetails

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
					value: details.notificationPreferences,
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
		<Grid templateColumns={'200px 1fr'} templateRows={'75px 1fr 100px'}>
			<GridItem
				colStart={1}
				colEnd={3}
				rowStart={1}
				rowEnd={2}
				bgColor={'brand.200'}
				borderBottom={'1px solid'}
				borderColor={'accent.300'}
			></GridItem>
			<GridItem colStart={2} colEnd={3} rowStart={2} rowEnd={3}>
				<Flex
					as='section'
					id='dashboard'
					maxW='100vw'
					minH='100vh'
					h='100%'
					bgColor={'brand.300'}
					color={'white'}
					p='1em'
					pt='5em'
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
			</GridItem>
			<GridItem colStart={1} colEnd={2} rowStart={2} rowEnd={3}>
				<DashboardMenuLinks />
			</GridItem>
			<GridItem colStart={1} colEnd={3} rowStart={3} rowEnd={4}>
				<Footer />
			</GridItem>
		</Grid>
	)
}

export default DashboardPage
