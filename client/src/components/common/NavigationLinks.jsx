import React from 'react'
import { Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-scroll'
import { useLocation, useNavigate } from 'react-router-dom'
import { mainNavigationLinks, dashboardNavigationLinks } from '../../data/navigationConstants'

import { useUI } from '../../hooks/useUI'

const NavigationLinks = ({ onClose }) => {
	const { isDesktop } = useUI()

	const location = useLocation()

	let links = mainNavigationLinks

	if (location.pathname === '/dashboard/*') {
		links = dashboardNavigationLinks
	}

	return (
		<Stack direction={isDesktop ? 'row' : 'column'} spacing='3em' flex={1}>
			{links.map((link, index) => (
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
