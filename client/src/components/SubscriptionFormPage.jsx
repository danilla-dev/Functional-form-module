import React, { useState, useEffect } from 'react'
import { Center, Heading } from '@chakra-ui/react'
import SubscriptionForm from './SubscriptionForm'
import { useLocation, useNavigate } from 'react-router-dom'
import Navigation from './navigation/Navigation'

import { useAuth } from '../hooks/useAuth'
import { useSubscribe } from '../hooks/useSubscribe'
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
		<Center
			as='section'
			id='subscription-form'
			align='center'
			w='100%'
			h='100%'
			bgGradient='radial( brand.300 20%, brand.350)'
		>
			<SubscriptionForm />
		</Center>
	)
}

export default SubscriptionFormPage
