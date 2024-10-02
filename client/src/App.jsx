import { useState } from 'react'
import Header from './components/header/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import { Grid, GridItem } from '@chakra-ui/react'

import './App.css'

function App() {
	return (
		<Grid templateRows='repeat(100vh, 1fr, 200px)' gap={1} minH='100vh'>
			<GridItem as='header' minW='100%' minH='100vh'>
				<Header />
			</GridItem>
			<GridItem as='main' minW='100%' minH='100vh'>
				<Main />
			</GridItem>
			<GridItem as='footer' w='100%' h='200px'>
				<Footer />
			</GridItem>
		</Grid>
	)
}

export default App
