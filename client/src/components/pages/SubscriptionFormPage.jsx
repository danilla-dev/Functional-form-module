import React, { useState, useEffect } from 'react'
import { Center, Grid, GridItem, Heading } from '@chakra-ui/react'
import SubscriptionForm from '../forms/SubscriptionForm'
import { useLocation, useNavigate } from 'react-router-dom'
import Footer from '../Footer'

import { useAuth } from '../../hooks/useAuth'
import { useSubscribe } from '../../hooks/useSubscribe'
const SubscriptionFormPage = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const { subscriptionDetails } = useSubscribe()
	const { currentUser } = useAuth()

	console.log('currentUser-', currentUser)
	useEffect(() => {
		if (currentUser.activeSub) {
			navigate('/dashboard')
		}
	}, [currentUser.activeSub])
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
					<SubscriptionForm />
				</Center>
			</GridItem>
			<GridItem rowStart={2} rowEnd={3}>
				<Footer />
			</GridItem>
		</Grid>
	)
}

export default SubscriptionFormPage
