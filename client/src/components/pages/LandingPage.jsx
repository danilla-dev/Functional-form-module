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
		<Grid gridTemplateRows={'1fr 100px'} className='landing-page'>
			<GridItem rowStart={1} rowEnd={2}>
				<Flex
					direction='column'
					bgImage={'linear-gradient(190deg, brand.200 25%, brand.350 50%, brand.350 75%, brand.200 100%)'}
				>
					<Header />
					<Flex position='relative' as='section' id='About' direction='column' align='center'>
						<HowItWorks />
						<BestFeatures />
					</Flex>
				</Flex>
				<Flex
					direction='column'
					bgImage={'linear-gradient(190deg, brand.350 0%, brand.200 15%,  brand.200 60%, brand.350 100%)'}
				>
					<Flex as='section' id='Pricing' direction='column' align='center' position='relative'>
						<Pricing />
					</Flex>
					<Flex as='section' id='FAQ' direction='column' align='center'>
						<FAQ />
					</Flex>
					<Flex as='section' id='Contact' direction='column' align='center'>
						<Contact />
					</Flex>
				</Flex>
			</GridItem>
			<GridItem rowStart={2} rowEnd={3}>
				<Footer />
			</GridItem>
		</Grid>
	)
}

export default LandingPage
