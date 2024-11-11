import React, { useEffect } from 'react'
import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	VStack,
	Text,
	Box,
} from '@chakra-ui/react'
import ActionButton from '../common/ActionButton'
import { NavLink } from 'react-router-dom'

import NavigationLinks from '../common/NavigationLinks'
import Logo from '../common/Logo'

import { useUI } from '../../hooks/useUI'
import useNavigation from '../../hooks/useNavigation'

const MenuDrawer = ({ isOpen, onClose }) => {
	const { isDesktop } = useUI()
	const { buttonType } = useNavigation(onClose)
	const { text, path, action } = buttonType

	useEffect(() => {
		if (isDesktop) {
			onClose()
		}
	}, [isDesktop, onClose])

	return (
		<Drawer placement='right' onClose={onClose} isOpen={isOpen} size='full' className='menu-drawer'>
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
								text={text}
								icon={null}
								action={action}
								ariaLabel='Sign up'
								priority='high'
								type='button'
								content={
									text !== 'Logout' ? (
										<NavLink style={{ zIndex: 5 }} to={path || null}>
											{text}
										</NavLink>
									) : (
										<Text fontWeight={400} as='span' zIndex={5}>
											{text}
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
