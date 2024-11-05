import React, { useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useSubscribe } from '../../hooks/useSubscribe'
import { Routes, Route } from 'react-router-dom'

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
import MainDashboard from '../dashboardSections/MainDashboard'
import Account from '../dashboardSections/Account'
import Integrations from '../dashboardSections/Integrations'
import Footer from '../Footer'
import DashboardMenuLinks from '../common/DashboardMenuLinks'
import { useUI } from '../../hooks/useUI'

const DashboardPage = () => {
	const { isDesktop } = useUI()

	return (
		<Grid templateColumns={{ base: '1fr', lg: '160px 1fr' }} templateRows={'75px 1fr 100px'}>
			<GridItem
				colStart={1}
				colEnd={3}
				rowStart={1}
				rowEnd={2}
				bgColor={'brand.200'}
				borderBottom={'1px solid'}
				borderColor={'accent.300'}
			></GridItem>
			<GridItem colStart={{ base: 1, lg: 2 }} colEnd={3} rowStart={2} rowEnd={3}>
				<Flex
					as='section'
					id='dashboard'
					justify='center'
					maxW='100vw'
					minH='100vh'
					h='100%'
					bgColor={'brand.300'}
					color={'white'}
					p='0 1em'
					pt='5em'
					bgImage={'linear-gradient(50deg, brand.200 2%, brand.350 50%, brand.350 35%, brand.200 100%)'}
				>
					<Container className='dashboard-container' maxW={1600} centerContent p='0 1em' w='100%' pb='3em'>
						<Routes>
							<Route path='/' element={<MainDashboard />} />
							<Route path='/integrations' element={<Integrations />} />
							<Route path='/account' element={<Account />} />
						</Routes>
					</Container>
				</Flex>
			</GridItem>
			{isDesktop && (
				<GridItem colStart={1} colEnd={2} rowStart={2} rowEnd={3}>
					<DashboardMenuLinks />
				</GridItem>
			)}
			<GridItem colStart={1} colEnd={3} rowStart={3} rowEnd={4}>
				<Footer />
			</GridItem>
		</Grid>
	)
}

export default DashboardPage
