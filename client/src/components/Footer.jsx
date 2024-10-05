import React from 'react'
import { Stack } from '@chakra-ui/react'
import NavigationLinks from './common/NavigationLinks'
import Logo from './common/Logo'

const Footer = () => {
	return (
		<Stack bgColor='brand.200' boxShadow='dark-lg' h={100} align='center' justify='center'>
			<Logo />
		</Stack>
	)
}

export default Footer
