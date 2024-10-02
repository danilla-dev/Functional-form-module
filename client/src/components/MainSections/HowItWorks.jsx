import React from 'react'
import sectionImage from '../../assets/data-stock-img.png'
import processorImage from '../../assets/processor-img.png'
import { Box, Image, Stack, Text, VStack, useBreakpointValue, Heading, Container } from '@chakra-ui/react'

import { Fade, Slide } from 'react-awesome-reveal'

const HowItWorks = () => {
	const displaySize = useBreakpointValue({ base: 'base', sm: 'mobile', md: 'tablet', lg: 'desktop' })
	const isMobile = displaySize === 'base'

	const howItWorksTexts = [
		'Our AI agent utilizes cutting-edge machine learning algorithms to adapt to your preferences. The more you interact with it, the better it understands your needs and can provide even more personalized recommendations.',
		'As you engage with the agent, it continuously learns from your choices, refining its understanding of what you like and dislike. This dynamic learning process allows it to anticipate your needs and deliver tailored suggestions that enhance your experience.',
	]
	return (
		<Container m={0} centerContent p='0 2em' minW='100%' bgColor='brand.100' pb='3em'>
			<Stack maxW={1400} w='100%' align='center'>
				<Heading as='h2' mb='0.5em' color='brand.400' textAlign='center' borderBottom='1px solid' w='80%' pb='.25em'>
					How it works?
				</Heading>
				<VStack spacing='4em'>
					{howItWorksTexts.map((text, index) => {
						const direction = index % 2 === 0 ? 'row' : 'row-reverse'
						const slideDirection = index % 2 === 0 ? 'left' : 'right'
						return (
							<Slide key={index} triggerOnce duration={1000} direction={slideDirection} delay={index * 800}>
								<Stack
									direction={{ base: 'column', sm: direction }}
									justify='space-evenly'
									align='center'
									w='100%'
									spacing='3em'
									mt='2em'
								>
									<Box maxW={!isMobile && '40%'} minW='200px' pos='relative'>
										<Text textAlign={isMobile && 'center'}>{text}</Text>
									</Box>
									{!isMobile && (
										<Box maxW={300} minW={200} h='100%'>
											<Image
												src={index === 0 ? processorImage : sectionImage}
												filter='drop-shadow(2px 2px 2px #222)'
											></Image>
										</Box>
									)}
								</Stack>
							</Slide>
						)
					})}
				</VStack>
			</Stack>
		</Container>
	)
}

export default HowItWorks
