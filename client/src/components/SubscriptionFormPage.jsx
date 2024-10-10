import React, { useState, useEffect } from 'react'
import { Center, Heading } from '@chakra-ui/react'
import SubscriptionForm from './SubscriptionForm'
import { useLocation, useNavigate } from 'react-router-dom'
import { continueRegistration } from '../api/authApi'

import { useAuth } from '../hooks/useAuth'

const SubscriptionFormPage = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const { login } = useAuth()

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search)
		const token = queryParams.get('token')
		
		const verifyToken = async () => {
			const data = await continueRegistration(token)
			login(data.user)
			localStorage.setItem('authToken', data.token)
		}
		if (token) {
			verifyToken()
		}
	}, [location, navigate])

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
