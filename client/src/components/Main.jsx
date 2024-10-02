import React from 'react'
import { Container, Flex, Heading } from '@chakra-ui/react'
import HowItWorks from './MainSections/HowItWorks'
import BestFeatures from './MainSections/BestFeatures'

const Main = () => {
	return (
		<Flex as='section' id='About' direction='column' align='center'>
			<HowItWorks />
			<BestFeatures />
		</Flex>
	)
}

export default Main
