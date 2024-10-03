import React from 'react'
import { Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-scroll'

const NavigationLinks = ({ isDesktop, onClose }) => {
	const navigationLinks = [
		{ name: 'Home', link: 'Home' },
		{ name: 'About', link: 'About' },
		{ name: 'Pricing', link: 'Pricing' },
		{ name: 'FAQ', link: 'FAQ' },
		{ name: 'Contact', link: '/contact' },
	]
	return (
		<Stack direction={isDesktop ? 'row' : 'column'} spacing='3em'>
			{navigationLinks.map((link, index) => (
				<Link
					key={index}
					to={link.link}
					spy
					duration={500}
					smooth
					activeClass='active'
					activeStyle={{ color: '#3cbbc7', textDecoration: 'underline' }}
					onClick={!isDesktop && onClose}
					offset={-200}
				>
					<Text fontSize='xl'>{link.name}</Text>
				</Link>
			))}
		</Stack>
	)
}

export default NavigationLinks
