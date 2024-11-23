import React, { useState, useEffect, useMemo } from 'react'
import { Center, Grid, GridItem, Heading } from '@chakra-ui/react'
import SubscriptionForm from '../forms/SubscriptionForm'
import { useLocation, useNavigate } from 'react-router-dom'
import Footer from '../Footer'

import { useAuth } from '../../hooks/useAuth'
import { useSubscribe } from '../../hooks/useSubscribe'
import Cookies from 'js-cookie'

const SubscriptionFormPage = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const { subscriptionDetails } = useSubscribe()
	const { currentUser, authIsLoading, userData } = useAuth()
	const isLoggedIn = Cookies.get('authStatus') === 'true'

	return (
		<Grid gridTemplateRows={'9fr 1fr'} className='signup-page'>
			<GridItem rowStart={1} rowEnd={2} maxW='100vw'>
				<Center
					as='section'
					id='subscription-form-page'
					align='center'
					w='100%'
					h='100%'
					bgImage={'linear-gradient(190deg, brand.200 -10%, brand.350 20%, brand.350 75%, brand.200 110%)'}
				>
					<SubscriptionForm />
				</Center>
			</GridItem>
			<GridItem rowStart={2} rowEnd={3} h={100}>
				<Footer />
			</GridItem>
		</Grid>
	)
}

export default SubscriptionFormPage
