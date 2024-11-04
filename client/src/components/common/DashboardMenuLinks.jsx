import React from 'react'
import { VStack, Text, Box } from '@chakra-ui/react'
import { useLocation, useNavigate, NavLink } from 'react-router-dom'
import { dashboardNavigationLinks } from '../../data/navigationConstants'
import NavigationLinks from './NavigationLinks'

import { useUI } from '../../hooks/useUI'
import { color } from 'framer-motion'

const DashboardMenuLinks = ({ onClose }) => {
	const { isDesktop } = useUI()

	return (
		<Box bgColor='brand.350' h='100%' borderColor={'accent.300'}>
			<VStack spacing='3em' flex={1} color='brand.100' p='1em' align='flex-start'>
				{dashboardNavigationLinks.map((link, index) => (
					<NavLink key={index} to={link.link} zIndex={20} exact className={({ isActive }) => isActive && 'active'} end>
						<Text fontSize='xl' _hover={{ color: 'accent.200' }} transition={'0.2s'}>
							{link.name}
						</Text>
					</NavLink>
				))}
			</VStack>
		</Box>
	)
}

export default DashboardMenuLinks
