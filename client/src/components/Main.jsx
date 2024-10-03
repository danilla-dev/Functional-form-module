import React from 'react'
import { Container, Flex, Heading, Box, Image, useBreakpointValue } from '@chakra-ui/react'
import HowItWorks from './MainSections/HowItWorks'
import BestFeatures from './MainSections/BestFeatures'
import Pricing from './MainSections/Pricing'

const Main = () => {
	const displaySize = useBreakpointValue({ base: 'base', sm: 'mobile', md: 'tablet', lg: 'desktop' })
	const isMobile = displaySize === 'base'
	const isTablet = displaySize === 'tablet'
	const isDesktop = displaySize === 'desktop'

	const display = {
		isMobile,
		isDesktop,
		isTablet,
	}

	return (
		<>
			<Flex as='section' id='About' direction='column' align='center'>
				<HowItWorks display={display} />
				<BestFeatures display={display} />
			</Flex>
			<Flex as='section' id='Pricing' direction='column' align='center'>
				<Pricing display={display} />
			</Flex>
		</>
	)
}

export default Main
