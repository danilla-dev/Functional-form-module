import React from 'react'
import { Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-scroll'
import { useLocation, useNavigate } from 'react-router-dom'

import { useUI } from '../../hooks/useUI'

const NavigationLinks = ({ onClose }) => {
	const { isDesktop } = useUI()

	const navigationLinks = [
		{ name: 'Home', link: 'Home' },
		{ name: 'About', link: 'About' },
		{ name: 'Pricing', link: 'Pricing' },
		{ name: 'FAQ', link: 'FAQ' },
		{ name: 'Contact', link: 'Contact' },
	]

	return (
		<Stack direction={isDesktop ? 'row' : 'column'} spacing='3em' flex={1}>
			{navigationLinks.map((link, index) => (
				<Link
					key={index}
					to={link.link}
					spy
					duration={500}
					smooth
					activeClass='active'
					activeStyle={{ color: '#3cbbc7', textDecoration: 'underline' }}
					onClick={onClose}
					offset={-75}
				>
					<Text fontSize='xl'>{link.name}</Text>
				</Link>
			))}
		</Stack>
	)
}

export default NavigationLinks
