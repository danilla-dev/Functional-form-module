import React from 'react'
import { HStack, Text, Box, Center } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

const Logo = () => {
	return (
		<Center>
			<NavLink to='/'>
				<HStack fontWeight='bold'>
					<Text color='accent.50' className='logo'>
						AI
					</Text>
					<Text color='brand.50' className='logo'>
						Agent
					</Text>
				</HStack>
			</NavLink>
		</Center>
	)
}

export default Logo
