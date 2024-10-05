import React, { useEffect, useState } from 'react'
import { throttle } from 'lodash'
import { Container, Stack, Button, Text, HStack, useDisclosure, Box } from '@chakra-ui/react'
import { GiHamburgerMenu } from 'react-icons/gi'

import NavigationLinks from '../common/NavigationLinks'
import MenuDrawer from './MenuDrawer'
import Logo from '../common/Logo'

const Navigation = ({ isDesktop }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [scrollPosition, setScrollPosition] = useState(0)

	useEffect(() => {
		const calculateDistance = () => {
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop
			setScrollPosition(scrollTop)
		}
		const throttledCalculateDistance = throttle(calculateDistance, 200)
		window.addEventListener('scroll', throttledCalculateDistance)
		return () => {
			window.removeEventListener('scroll', throttledCalculateDistance)
		}
	}, [scrollPosition])

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
			boxShadow={`0 2px 10px rgba(12, 1, 58, 0.5)`}
		>
			<Stack
				direction='row'
				w='100%'
				maxW={1400}
				align='center'
				justify={isDesktop ? 'start' : 'end'}
				h='100%'
				m='0 auto'
				p='0 2em'
				zIndex={20}
			>
				{!isDesktop ? (
					<Button colorScheme='transparent' onClick={onOpen} aria-label='Open aside nav menu' role='button'>
						<GiHamburgerMenu fontSize={38} color='#3cbbc7' />
					</Button>
				) : (
					<HStack spacing='7em' color='brand.50'>
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
