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
	const { isDesktop } = useUI()

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
			h='100%'
			w='100%'
			ref={componentRef}
			minH='100vh'
			as='header'
			backgroundImage={isDesktop ? heroImageLG : heroImageSM}
			bgSize={'cover'}
			bgPosition={'center'}
			bgRepeat={'no-repeat'}
			overflow='hidden'
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
				<HeaderImage />
			</Stack>
		</Flex>
	)
}

export default Header
