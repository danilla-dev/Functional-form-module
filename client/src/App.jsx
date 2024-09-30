import { useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import { Grid, GridItem } from '@chakra-ui/react'

import './App.css'

function App() {
	return (
		<Grid templateRows='repeat(100vh, 1fr, 200px)' gap={1} minH='100vh'>
			<GridItem w='100%' h='100vh'>
				<Header />
			</GridItem>
			<GridItem w='100%' minH='100vh'>
				<Main />
			</GridItem>
			<GridItem w='100%' h='200px'>
				<Footer />
			</GridItem>
		</Grid>
	)
}

export default App
