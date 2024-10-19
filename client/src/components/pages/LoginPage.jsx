import React, { useState, useEffect } from 'react'
import { Center, Heading, Grid, GridItem } from '@chakra-ui/react'
import LoginForm from '../forms/LoginForm'
import Footer from '../Footer'

const LoginPage = () => {
	return (
		<Grid gridTemplateRows={'1fr 100px'}>
			<GridItem rowStart={1} rowEnd={2}>
				<Center
					as='section'
					id='subscription-form'
					align='center'
					w='100%'
					h='100vh'
					bgGradient='radial( brand.300 20%, brand.350)'
				>
					<LoginForm />
				</Center>
			</GridItem>
			<GridItem rowStart={2} rowEnd={3}>
				<Footer />
			</GridItem>
		</Grid>
	)
}

export default LoginPage
