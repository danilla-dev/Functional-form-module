import { useState } from 'react'
import Header from './components/header/Header'
import LandingPage from './components/LandingPage'
import Footer from './components/Footer'
import { Grid, GridItem } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/navigation/Navigation'
import SubscriptionFormPage from './components/SubscriptionFormPage'

import './App.css'

function App() {
	return (
		<Router>
			<Grid templateRows='repeat(100vh, 1fr, 200px)' minH='100vh'>
				<Routes>
					<Route path='/' element={<Header />} />
				</Routes>
				<GridItem as='main' minW='100%' minH='100vh'>
					<Routes>
						<Route path='/' element={<LandingPage />} />
						<Route path='/subscription' element={<SubscriptionFormPage />} />
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
