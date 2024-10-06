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
	Button,
	Box,
} from '@chakra-ui/react'

import { Link } from 'react-router-dom'

import NavigationLinks from '../common/NavigationLinks'
import Logo from '../common/Logo'

import { useUI } from '../../hooks/useUI'

const MenuDrawer = ({ isOpen, onClose }) => {
	const { isDesktop } = useUI()

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
						<NavigationLinks onClose={!isDesktop && onClose} />
						<Box w='100%' alignContent='center'>
							<Button
								borderColor='brand.50'
								color='.50'
								bgColor='brand.500'
								role='button'
								aria-label='Sign up'
								size='lg'
								_hover={{
									borderColor: 'brand.100',
									bgColor: 'brand.550',
									color: 'brand.100',
								}}
							>
								<Link to='/subscription'>Get started</Link>
							</Button>
						</Box>
					</VStack>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	)
}

export default MenuDrawer
