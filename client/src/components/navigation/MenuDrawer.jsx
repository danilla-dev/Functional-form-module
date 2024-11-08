import React, { useState, useEffect } from 'react'
import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	VStack,
	Text,
	Button,
	Box,
} from '@chakra-ui/react'
import ActionButton from '../common/ActionButton'
import { NavLink } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'

import NavigationLinks from '../common/NavigationLinks'
import Logo from '../common/Logo'
import Cookies from 'js-cookie'

import { useUI } from '../../hooks/useUI'
import { useAuth } from '../../hooks/useAuth'

const MenuDrawer = ({ isOpen, onClose }) => {
	const { isDesktop } = useUI()
	const [buttonType, setButtonType] = useState({ text: '', path: '' })
	const { logoutUser } = useAuth()

	const location = useLocation()

	const isLoggedIn = Cookies.get('authStatus') === 'true'

	const handleLogout = async () => {
		await logoutUser.mutateAsync()
	}

	useEffect(() => {
		isDesktop && onClose()
		switch (location.pathname) {
			case '/':
				setButtonType({
					text: isLoggedIn ? 'Dashboard' : 'Get started',
					path: isLoggedIn ? '/dashboard' : '/subscription',
					action: onClose,
				})
				break
			case '/subscription':
				setButtonType({ text: 'Login', path: '/login', action: onClose })
				break
			case '/login':
				setButtonType({ text: 'Get started', path: '/subscription', action: onClose })
				break
			case '/dashboard':
				setButtonType({
					text: 'Logout',
					path: '/',
					action: () => {
						handleLogout()
						onClose()
					},
				})
				break
		}
	}, [location.pathname])

	return (
		<Drawer placement='right' onClose={onClose} isOpen={isOpen} size='full'>
			<DrawerOverlay />
			<DrawerContent bgColor='brand.200'>
				<DrawerCloseButton size='lg' fontSize='md' color='#3cbbc7' />
				<DrawerHeader
					borderBottom='1px solid'
					borderBottomColor='accent.50'
					textAlign='center'
					fontSize='xl'
					w='60%'
					m='0 auto'
					maxW='500px'
				>
					<Logo />
				</DrawerHeader>
				<DrawerBody mt='2em' color='brand.50'>
					<VStack fontSize='xl' align='stretch' textAlign='center' spacing='2em'>
						<NavigationLinks onClose={!isDesktop && onClose} />
						<Box w='100%' alignContent='center'>
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
						</Box>
					</VStack>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	)
}

export default MenuDrawer
