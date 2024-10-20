import React, { useEffect, useState } from 'react'
import { throttle } from 'lodash'
import { Container, Stack, Button, Text, HStack, useDisclosure, Box, ButtonGroup } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'

import { GiHamburgerMenu } from 'react-icons/gi'

import NavigationLinks from '../common/NavigationLinks'
import MenuDrawer from './MenuDrawer'
import Logo from '../common/Logo'
import ActionButton from '../common/ActionButton'

import { useUI } from '../../hooks/useUI'
import { useAuth } from '../../hooks/useAuth'
import { useSubscribe } from '../../hooks/useSubscribe'

const Navigation = () => {
	const { isDesktop } = useUI()
	const { logoutUser } = useAuth()
	const { setSubscriptionDetails } = useSubscribe()

	const { isOpen, onOpen, onClose } = useDisclosure()
	const [scrollPosition, setScrollPosition] = useState(0)
	const [buttonType, setButtonType] = useState({ text: '', path: '' })
	const location = useLocation()
	const navigate = useNavigate()

	const logout = async () => {
		await logoutUser.mutateAsync()
		setSubscriptionDetails({
			name: '',
			price: 0,
			details: {
				communicationStyle: '',
				preferences: [],
				communicationPreferences: '',
			},
			paymentStatus: '',
			subscriptionDurationType: '',
			subscriptionEndDate: '',
			user: '',
		})
		navigate('/')
	}

	useEffect(() => {
		switch (location.pathname) {
			case '/':
			case '/login':
				setButtonType({ text: 'Get started', path: '/subscription' })
				break
			case '/subscription':
				setButtonType({ text: 'Login', path: '/login' })
				break
			case '/dashboard':
				setButtonType({ text: 'Logout', action: logout })
				break
			default:
				break
		}

		const calculateDistance = () => {
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop
			setScrollPosition(scrollTop)
		}
		const throttledCalculateDistance = throttle(calculateDistance, 200)
		window.addEventListener('scroll', throttledCalculateDistance)
		return () => {
			window.removeEventListener('scroll', throttledCalculateDistance)
		}
	}, [scrollPosition, location.pathname])


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
				maxW={1600}
				align='center'
				justify={isDesktop ? 'start' : 'end'}
				h='100%'
				m='0 auto'
				p='0 2em'
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
					<HStack
						spacing='7em'
						color='brand.50'
						w='100%'
						justify='space-between'
						pl={location.pathname === '/dashboard' && isDesktop ? 200 : 0}
					>
						<Logo />
						{location.pathname === '/' && <NavigationLinks />}
						<ActionButton
							text={buttonType.text}
							icon={null}
							action={buttonType.action}
							ariaLabel='Sign up'
							priority='high'
							type='button'
							content={<NavLink to={buttonType.path || null}>{buttonType.text}</NavLink>}
						/>
					</HStack>
				)}
			</Stack>
			<MenuDrawer isOpen={isOpen} onClose={onClose} />
		</Box>
	)
}

export default Navigation
