import { useEffect, useState } from 'react'
import useFetchUser from './hooks/useFetchUser'
import Header from './components/header/Header'
import LandingPage from './components/LandingPage'
import Footer from './components/Footer'
import { Grid, GridItem, useBreakpointValue } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/navigation/Navigation'
import SubscriptionFormPage from './components/SubscriptionFormPage'
import { useAuth } from './hooks/useAuth'

import './App.css'

function App() {
	const { user, error, loading } = useFetchUser()
	const { login, currentUser } = useAuth()

	const displaySize = useBreakpointValue({
		base: 'base',
		sm: 'mobile',
		md: 'tablet',
		lg: 'desktop',
	})
	const isBase = displaySize === 'base'
	const isMobile = displaySize === 'desktop'
	const isTablet = displaySize === 'tablet'
	const isDesktop = displaySize === 'desktop'
	const isWideDesktop = displaySize === 'wide-desktop'

	const display = {
		isMobile,
		isDesktop,
		isTablet,
		isBase,
		isWideDesktop,
	}

	if (loading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error}</div>
	}

	if (user && !currentUser) {
		login(user)
	}
	return (
		<Router>
			<Grid templateRows='repeat(100vh, 1fr, 200px)' minH='100vh'>
				<Routes>
					<Route path='/' element={<Header display={display} />} />
				</Routes>
				<GridItem as='main' minW='100%' minH='100vh'>
					<Routes>
						<Route path='/' element={<LandingPage display={display} />} />
						<Route path='/subscription' element={<SubscriptionFormPage display={display} />} />
					</Routes>
				</GridItem>
				<GridItem as='footer' w='100%' h='100px'>
					<Footer />
				</GridItem>
			</Grid>
		</Router>
	)
}

export default App
