import React from 'react'
import { VStack, Text, Box } from '@chakra-ui/react'
import { useLocation, useNavigate, NavLink } from 'react-router-dom'

import { useUI } from '../../hooks/useUI'

const DashboardMenuLinks = ({ onClose }) => {
	const { isDesktop } = useUI()

	const navigationLinks = [
		{ name: 'Dashboard', link: '/dashboard' },
		{ name: 'Integrations', link: '/dashboard/integrations' },
		{ name: 'Account', link: '/dashboard/account' },
	]

	return (
		<Box bgColor='brand.350' h='100%' borderRight={'1px solid'} borderColor={'accent.300'}>
			<VStack spacing='3em' flex={1} color='brand.100' p='1em' align='flex-start'>
				{navigationLinks.map((link, index) => (
					<NavLink key={index} to={link.link} zIndex={20} exact className={({ isActive }) => isActive && 'active'}>
						<Text fontSize='xl'>{link.name}</Text>
					</NavLink>
				))}
			</VStack>
		</Box>
	)
}

export default DashboardMenuLinks
