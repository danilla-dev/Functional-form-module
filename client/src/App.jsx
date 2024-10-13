import { useEffect, useState } from 'react'
import useFetchUser from './hooks/useFetchUser'
import Header from './components/header/Header'
import LandingPage from './components/LandingPage'
import Footer from './components/Footer'
import { Grid, GridItem, useBreakpointValue, Spinner, Center } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SubscriptionFormPage from './components/SubscriptionFormPage'
import DashboardPage from './components/DashboardPage'
import { useAuth } from './hooks/useAuth'
import { useSubscribe } from './hooks/useSubscribe'
import PrivateRouts from './components/PrivateRouts'
import LoginPage from './components/LoginPage'

import './App.css'
import Navigation from './components/navigation/Navigation'

function App() {
	const { currentUser, loginUser, logoutUser, registerUser, authIsLoading, isLoading } = useAuth()
	const { subIsLoading } = useSubscribe()

	if (authIsLoading && subIsLoading) {
		return (
			<Center h='100vh'>
				<Spinner size='xl' />
			</Center>
		)
	}

	return (
		<Grid templateRows='repeat(100vh, 1fr, 200px)' minH='100vh'>
			<Navigation />
			<Routes>
				<Route path='/' element={<Header />} />
			</Routes>
			<GridItem as='main' minW='100%' minH='100vh'>
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='/subscription' element={<SubscriptionFormPage />} />
					<Route path='/dashboard' element={<PrivateRouts element={<DashboardPage />} />} />
					<Route path='/login' element={<LoginPage />} />
				</Routes>
			</GridItem>
			<GridItem as='footer' w='100%' h='100px'>
				<Footer />
			</GridItem>
		</Grid>
	)
}

export default App
