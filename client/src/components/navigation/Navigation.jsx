import React from 'react'
import { Container, Stack, Button, Text, HStack, useDisclosure, Box } from '@chakra-ui/react'
import { GiHamburgerMenu } from 'react-icons/gi'

import NavigationLinks from '../common/NavigationLinks'
import MenuDrawer from './MenuDrawer'
import Logo from '../common/Logo'

const Navigation = ({ isDesktop }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<Box as='nav' w='100%' maxW={1400} h={75} m={0} p='0 1em' position='fixed' zIndex={15}>
			<Stack as='nav' direction='row' align='center' justify={isDesktop ? 'start' : 'end'} h='100%'>
				{!isDesktop ? (
					<Button colorScheme='transparent' onClick={onOpen}>
						<GiHamburgerMenu fontSize={38} color='#3cbbc7' />
					</Button>
				) : (
					<HStack spacing='7em' color='#FFFFFF'>
						<Logo />
						<NavigationLinks isDesktop={isDesktop} />
					</HStack>
				)}
			</Stack>
			<MenuDrawer isOpen={isOpen} onClose={onClose} isDesktop={isDesktop} />
		</Box>
	)
}

export default Navigation
