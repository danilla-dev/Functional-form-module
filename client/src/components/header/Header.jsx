import React, { useRef, useState, useEffect } from 'react'
import {
	Image,
	Box,
	useBreakpointValue,
	Stack,
	Flex,
} from '@chakra-ui/react'

import Navigation from '../navigation/Navigation'
import HeaderText from './HeaderText'
import HeaderImage from './HeaderImage'

import heroImageSM from '../../assets/hero-img-sm.png'
import heroImageLG from '../../assets/hero-img-lg.png'





const Header = () => {
	const displaySize = useBreakpointValue({ base: 'mobile', md: 'tablet', lg: 'desktop' })
	const isDesktop = displaySize === 'desktop'
	const componentRef = useRef(null)

	const [distanceFromTop, setDistanceFromTop] = useState(0)

	useEffect(() => {
		const calculateDistance = () => {
		  if (componentRef.current) {
			const rect = componentRef.current.getBoundingClientRect()
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop
			const distance = rect.bottom + scrollTop
			setDistanceFromTop(distance)
		  }
		}
		calculateDistance()
		window.addEventListener('resize', calculateDistance)
		return () => {
		  window.removeEventListener('resize', calculateDistance)
		}
	  }, [])


	return (
		<Flex direction='column' align='center' position='relative' id='Home' h='100%' w='100%' ref={componentRef}>
			<Navigation isDesktop={isDesktop} />
			<Box w='100%' h='100%' pos='absolute' top={0} left={0}>
				<Image
					src={isDesktop ? heroImageLG : heroImageSM}
					boxSize='100%'
					objectFit='cover'
					alt='Background blue image'
					zIndex={5}
				/>
			</Box>
			<Stack direction={isDesktop ? 'row' : 'column'} align='center' justify={ isDesktop ? 'space-between' : 'center'} wrap="wrap" spacing='1em' minH='100%' w='100%' maxW={1400} zIndex={10} p='65px 1.5em'>
				<HeaderText isDesktop={isDesktop} distance={distanceFromTop}/>
				<HeaderImage isDesktop={isDesktop} />
				
			</Stack>
		</Flex>
	)
}

export default Header
