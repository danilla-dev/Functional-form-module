import React from 'react'
import { Container, Flex, Heading, Box, Image, useBreakpointValue, Grid, GridItem } from '@chakra-ui/react'
import HowItWorks from '../MainSections/HowItWorks'
import BestFeatures from '../MainSections/BestFeatures'
import Pricing from '../MainSections/Pricing'
import FAQ from '../MainSections/FAQ'
import Contact from '../MainSections/Contact'
import Header from '../header/Header'
import Footer from '../Footer'
import { useUI } from '../../hooks/useUI'

const LandingPage = () => {
	return (
		<Grid gridTemplateRows={'1fr 100px'}>
			<GridItem rowStart={1} rowEnd={2}>
				<Header />
				<Flex as='section' id='About' direction='column' align='center' bgColor='brand.100'>
					<HowItWorks />
					<BestFeatures />
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
					<Pricing />
				</Flex>
				<Flex as='section' id='FAQ' direction='column' align='center' bgGradient='radial( brand.300 20%, brand.350)'>
					<FAQ />
				</Flex>
				<Flex as='section' id='Contact' direction='column' align='center' bgColor='brand.50'>
					<Contact />
				</Flex>
			</GridItem>
			<GridItem rowStart={2} rowEnd={3}>
				<Footer />
			</GridItem>
		</Grid>
	)
}

export default LandingPage
