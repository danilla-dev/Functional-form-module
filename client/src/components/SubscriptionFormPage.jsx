import React, { useState, useEffect } from 'react'
import { Center, Heading } from '@chakra-ui/react'
import SubscriptionForm from './SubscriptionForm'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

const SubscriptionFormPage = () => {
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
