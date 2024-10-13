import React, { useState, useEffect } from 'react'
import { Center, Heading } from '@chakra-ui/react'
import LoginForm from './LoginForm'
import { useLocation, useNavigate } from 'react-router-dom'
import Navigation from './navigation/Navigation'

import { useAuth } from '../hooks/useAuth'

const LoginPage = () => {
	return (
		<Center
			as='section'
			id='subscription-form'
			align='center'
			w='100%'
			h='100%'
			bgGradient='radial( brand.300 20%, brand.350)'
		>
			<LoginForm />
		</Center>
	)
}

export default LoginPage
