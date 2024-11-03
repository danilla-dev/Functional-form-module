import { useEffect, useState } from 'react'
import useFetchUser from './hooks/useFetchUser'
import Header from './components/header/Header'
import LandingPage from './components/pages/LandingPage'
import Footer from './components/Footer'
import { Grid, GridItem, useBreakpointValue, Spinner, Center, Box } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SubscriptionFormPage from './components/pages/SubscriptionFormPage'
import DashboardPage from './components/pages/DashboardPage'
import { useAuth } from './hooks/useAuth'
import { useSubscribe } from './hooks/useSubscribe'
import PrivateRouts from './components/PrivateRouts'
import LoginPage from './components/pages/LoginPage'
import { useLocation } from 'react-router-dom'

import './App.css'
import Navigation from './components/navigation/Navigation'
import DashboardMenuLinks from './components/common/DashboardMenuLinks'

function App() {
	const { authIsLoading } = useAuth()
	const { setSubscriptionDetails, subscriptionDetails, subIsLoading, refetch, subData } = useSubscribe()
	const dashboardLocation = useLocation().pathname === '/dashboard'

	console.log(dashboardLocation)
	console.log('subisloading:', subIsLoading)

	if (authIsLoading || subIsLoading) {
		return (
			<Center h='100vh'>
				<Spinner size='xl' />
			</Center>
		)
	}

	return (
		<>
			<Navigation />
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route path='/subscription' element={<SubscriptionFormPage />} />
				<Route path='/dashboard' element={<PrivateRouts element={<DashboardPage />} />} />
				<Route path='/login' element={<LoginPage />} />
			</Routes>
		</>
	)
}

export default App
