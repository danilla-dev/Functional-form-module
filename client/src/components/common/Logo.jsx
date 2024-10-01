import React from 'react'
import { HStack, Text, Box, Center } from '@chakra-ui/react'

const Logo = () => {
	return (
		<Center>
			<HStack fontSize={24} fontWeight='bold'>
				<Text color='#3cbbc7'>AI</Text>
				<Text color='#FFFFFF'>Agent</Text>
			</HStack>
		</Center>
	)
}

export default Logo
