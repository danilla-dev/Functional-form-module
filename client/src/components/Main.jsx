import React from 'react'
import { Container, Flex, Heading, Box, Image, useBreakpointValue } from '@chakra-ui/react'
import HowItWorks from './MainSections/HowItWorks'
import BestFeatures from './MainSections/BestFeatures'
import Pricing from './MainSections/Pricing'
import FAQ from './MainSections/FAQ'
import Contact from './MainSections/Contact'

const Main = () => {
	const displaySize = useBreakpointValue({ base: 'base', sm: 'mobile', md: 'tablet', lg: 'desktop' })
	const isBase = displaySize === 'base'
	const isMobile = displaySize === 'desktop'
	const isTablet = displaySize === 'tablet'
	const isDesktop = displaySize === 'desktop'

	const display = {
		isMobile,
		isDesktop,
		isTablet,
		isBase,
	}

	return (
		<>
			<Flex as='section' id='About' direction='column' align='center' bgColor='brand.100'>
				<HowItWorks display={display} />
				<BestFeatures display={display} />
			</Flex>
			<Flex
				as='section'
				id='Pricing'
				direction='column'
				align='center'
				position='relative'
				bgColor='brand.100'
				_after={{
					content: '""',
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '50%',
					backgroundColor: 'brand.100',
					transform: 'skewY(-3deg)',
					transformOrigin: 0,
					zIndex: 5,
				}}
			>
				<Pricing display={display} />
			</Flex>
			<Flex as='section' id='FAQ' direction='column' align='center' bgGradient='radial( brand.300 20%, brand.350)'>
				<FAQ display={display} />
			</Flex>
			<Flex as='section' id='Contact' direction='column' align='center' bgColor='brand.50'>
				<Contact display={display} />
			</Flex>
		</>
	)
}

export default Main
