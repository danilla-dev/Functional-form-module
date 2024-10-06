import React, { useState } from 'react'
import { Center } from '@chakra-ui/react'
import SubscriptionForm from './SubscriptionForm'

import { useAuth } from '../hooks/useAuth'

const SubscriptionFormPage = () => {
	const { currentUser } = useAuth()
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
