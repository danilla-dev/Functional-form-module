import React from 'react'
import { HStack, Text, Box, Center } from '@chakra-ui/react'

const Logo = () => {
	return (
		<Center>
			<HStack fontWeight='bold'>
				<Text color='accent.50' className='logo'>
					AI
				</Text>
				<Text color='brand.50' className='logo'>
					Agent
				</Text>
			</HStack>
		</Center>
	)
}

export default Logo
