// components/Navigation/Navigation.js
import React from 'react'
import { Box, Stack, Button, HStack, Text, useDisclosure } from '@chakra-ui/react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { NavLink } from 'react-router-dom'

import NavigationLinks from '../common/NavigationLinks'
import MenuDrawer from './MenuDrawer'
import Logo from '../common/Logo'
import ActionButton from '../common/ActionButton'

import { useUI } from '../../hooks/useUI'
import useNavigation from '../../hooks/useNavigation'

const Navigation = () => {
	const { isDesktop } = useUI()
	const { scrollPosition, buttonType, handleLogout } = useNavigation()
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<Box
			as='nav'
			w='100%'
			h={75}
			m={0}
			position='fixed'
			zIndex={15}
			bgColor={scrollPosition > 100 ? 'brand.300' : 'transparent'}
			backdropFilter='blur(1px)'
			boxShadow='0 2px 10px rgba(12, 1, 58, 0.5)'
		>
			<Stack
				direction='row'
				w='100%'
				maxW={1600}
				align='center'
				justify={isDesktop ? 'start' : 'end'}
				h='100%'
				m='0 auto'
				p='2em 1em'
				zIndex={20}
			>
				{!isDesktop ? (
					<HStack justify='space-between' w='100%'>
						<Logo />
						<Button colorScheme='transparent' onClick={onOpen} aria-label='Open aside nav menu' role='button'>
							<GiHamburgerMenu fontSize={38} color='#3cbbc7' />
						</Button>
					</HStack>
				) : (
					<HStack spacing='7em' color='brand.50' w='100%' justify='space-between'>
						<Logo />
						{location.pathname === '/' && <NavigationLinks />}
						<ActionButton
							text={buttonType.text}
							icon={null}
							action={buttonType.action}
							ariaLabel='Sign up'
							priority='high'
							type='button'
							content={
								buttonType.text !== 'Logout' ? (
									<NavLink style={{ zIndex: 5 }} to={buttonType.path || null}>
										{buttonType.text}
									</NavLink>
								) : (
									<Text fontWeight={400} as='span' zIndex={5}>
										{buttonType.text}
									</Text>
								)
							}
						/>
					</HStack>
				)}
			</Stack>
			<MenuDrawer isOpen={isOpen} onClose={onClose} />
		</Box>
	)
}

export default Navigation
