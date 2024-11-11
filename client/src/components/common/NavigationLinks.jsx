import React from 'react'
import { Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-scroll'
import { NavLink } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { mainNavigationLinks, dashboardNavigationLinks } from '../../data/navigationConstants'

import { useUI } from '../../hooks/useUI'

const NavigationLinks = ({ onClose }) => {
	const { isDesktop } = useUI()

	const location = useLocation()

	let links = mainNavigationLinks

	const isDashboard = location.pathname.startsWith('/dashboard')

	if (isDashboard) {
		links = dashboardNavigationLinks
	}

	return (
		<Stack direction={isDesktop ? 'row' : 'column'} spacing='2em' flex={1} className='navigation-links'>
			{links.map((link, index) => {
				if (!isDashboard) {
					return (
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
					)
				}
				return (
					<NavLink
						key={index}
						to={link.link}
						end
						activeStyle={{ color: '#3cbbc7', textDecoration: 'underline' }}
						onClick={onClose}
					>
						<Text fontSize='xl'>{link.name}</Text>
					</NavLink>
				)
			})}
		</Stack>
	)
}

export default NavigationLinks
