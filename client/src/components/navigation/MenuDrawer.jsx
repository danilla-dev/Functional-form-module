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
import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'

import NavigationLinks from '../common/NavigationLinks'
import Logo from '../common/Logo'

import { useUI } from '../../hooks/useUI'

const MenuDrawer = ({ isOpen, onClose }) => {
	const { isDesktop } = useUI()
	const [buttonType, setButtonType] = useState({ text: '', path: '' })

	const location = useLocation()

	useEffect(() => {
		isDesktop && onClose()
		switch (location.pathname) {
			case '/':
				setButtonType({ text: 'Get started', path: '/subscription' })
				break
			case '/subscription':
				setButtonType({ text: 'Login', path: '/login' })
				break
			case '/dashboard':
				setButtonType({ text: 'Logout', path: '/' })
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
								action={null}
								ariaLabel='Sign up'
								priority='high'
								type='button'
								content={
									<Link onClick={onClose} to={buttonType.path}>
										{buttonType.text}
									</Link>
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
