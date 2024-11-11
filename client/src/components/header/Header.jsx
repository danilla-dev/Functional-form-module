import React, { useRef, useState, useEffect } from 'react'
import { Image, Box, useBreakpointValue, Stack, Flex } from '@chakra-ui/react'

import Navigation from '../navigation/Navigation'
import HeaderText from './HeaderText'
import HeaderImage from './HeaderImage'

import heroImageSM from '../../assets/hero-img-sm.webp'
import heroImageLG from '../../assets/hero-img-lg.webp'

import { useAuth } from '../../hooks/useAuth'
import { useUI } from '../../hooks/useUI'

import { calculateDistance } from '../../utils/calculateScroll'

const Header = () => {
	const { isDesktop, isMobile } = useUI()

	const componentRef = useRef(null)

	const [distanceFromTop, setDistanceFromTop] = useState(0)

	useEffect(() => {
		calculateDistance(componentRef, setDistanceFromTop)
		window.addEventListener('resize', calculateDistance)
		return () => {
			window.removeEventListener('resize', calculateDistance)
		}
	}, [])

	return (
		<Flex
			direction='column'
			align='center'
			position='relative'
			id='Home'
			h='100vh'
			minW='100%'
			maxW='100vw'
			ref={componentRef}
			minH='100vh'
			as='header'
			backgroundImage={isDesktop ? heroImageLG : heroImageSM}
			bgPosition={'center'}
			bgSize={'cover'}
			bgRepeat={'no-repeat'}
			boxShadow='0px 0px 24px 16px rgba(0,125,121,0.25)'
			className='header'
		>
			<Stack
				direction={isDesktop ? 'row' : 'column'}
				align='center'
				justify={isDesktop ? 'space-between' : 'space-evenly'}
				wrap='wrap'
				spacing='1em'
				minH='100%'
				w='100%'
				maxW={1400}
				zIndex={10}
				p='65px 2em'
			>
				<HeaderText distance={distanceFromTop} />
				{isDesktop && <HeaderImage />}
			</Stack>
		</Flex>
	)
}

export default Header
