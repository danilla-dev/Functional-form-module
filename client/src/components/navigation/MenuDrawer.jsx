import React from 'react'
import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	VStack,
	Text,
} from '@chakra-ui/react'

import NavigationLinks from '../common/NavigationLinks'
import Logo from '../common/Logo'

const MenuDrawer = ({ isOpen, onClose, isDesktop }) => {
	isDesktop && onClose()
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
						<NavigationLinks isDesktop={isDesktop} onClose={onClose} />
					</VStack>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	)
}

export default MenuDrawer
