import React from 'react'
import { Stack } from '@chakra-ui/react'
import NavigationLinks from './common/NavigationLinks'
import Logo from './common/Logo'
import Contact from './MainSections/Contact'

const Footer = () => {
	return (
		<Stack
			as='footer'
			bgColor='brand.200'
			boxShadow='dark-lg'
			h={100}
			align='center'
			justify='center'
			className='footer'
		>
			<Logo />
		</Stack>
	)
}

export default Footer
