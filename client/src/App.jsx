import { useEffect, useState } from 'react'
import useFetchUser from './hooks/useFetchUser'
import Header from './components/header/Header'
import LandingPage from './components/LandingPage'
import Footer from './components/Footer'
import { Grid, GridItem, useBreakpointValue, Spinner, Center, Box } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SubscriptionFormPage from './components/SubscriptionFormPage'
import DashboardPage from './components/DashboardPage'
import { useAuth } from './hooks/useAuth'
import { useSubscribe } from './hooks/useSubscribe'
import PrivateRouts from './components/PrivateRouts'
import LoginPage from './components/LoginPage'
import { useLocation } from 'react-router-dom'

import './App.css'
import Navigation from './components/navigation/Navigation'

function App() {
	const { currentUser, loginUser, logoutUser, registerUser, authIsLoading, isLoading } = useAuth()
	const { subIsLoading } = useSubscribe()
	const location = useLocation().pathname

	if (authIsLoading) {
		return (
			<Center h='100vh'>
				<Spinner size='xl' />
			</Center>
		)
	}

	return (
		<Grid
			gridTemplateRows={'75px 1fr 100px'}
			templateColumns={{ base: '1fr', lg: location === '/dashboard' ? '200px 1fr' : '1fr' }}
			minH='100vh'
		>
			<GridItem colStart={1} rowStart={1} rowEnd={2} colEnd={3} bgColor={location === '/dashboard' && 'brand.300'}>
				<Navigation />
			</GridItem>

			{location === '/dashboard' && (
				<GridItem colSpan={1} rowStart={2} rowEnd={3} bgColor='brand.300'>
					<Box bgColor='brand.300' h='100%'></Box>
				</GridItem>
			)}
			<GridItem
				rowStart={location === '/dashboard' ? 2 : 1}
				rowEnd={3}
				as='main'
				minW='100%'
				minH='100vh'
				colStart={{ base: 1, lg: location === '/dashboard' ? 2 : 1 }}
				colEnd={3}
			>
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='/subscription' element={<SubscriptionFormPage />} />
					<Route path='/dashboard' element={<PrivateRouts element={<DashboardPage />} />} />
					<Route path='/login' element={<LoginPage />} />
				</Routes>
			</GridItem>
			<GridItem colSpan={2} rowStart={3} as='footer' w='100%' h='100px'>
				<Footer />
			</GridItem>
		</Grid>
	)
}

export default App
