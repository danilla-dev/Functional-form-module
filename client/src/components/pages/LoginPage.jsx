import React, { useState, useEffect } from 'react'
import { Center, Heading, Grid, GridItem } from '@chakra-ui/react'
import LoginForm from '../forms/LoginForm'
import Footer from '../Footer'

const LoginPage = () => {
	return (
		<Grid gridTemplateRows={'1fr 100px'} className='login-page'>
			<GridItem rowStart={1} rowEnd={2}>
				<Center
					as='section'
					id='subscription-form'
					align='center'
					w='100%'
					h='100vh'
					bgImage={'linear-gradient(190deg, brand.200 -10%, brand.350 20%, brand.350 75%, brand.200 110%)'}
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
