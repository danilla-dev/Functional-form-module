import React from 'react'
import sectionImage from '../../assets/data-stock-img.webp'
import processorImage from '../../assets/processor-img.webp'
import { Box, Image, Stack, Text, VStack, Heading, Container } from '@chakra-ui/react'

import { Fade, Slide, Zoom } from 'react-awesome-reveal'

import { useUI } from '../../hooks/useUI'

const howItWorksTexts = [
	'Our AI agent utilizes cutting-edge machine learning algorithms to adapt to your preferences. The more you interact with it, the better it understands your needs and can provide even more personalized recommendations.',
	'As you engage with the agent, it continuously learns from your choices, refining its understanding of what you like and dislike. This dynamic learning process allows it to anticipate your needs and deliver tailored suggestions that enhance your experience.',
	'With advanced technology and an ongoing learning process, our AI agent becomes increasingly effective at adjusting to your lifestyle. You can be confident that with each use, the agent will more accurately reflect your preferences, offering recommendations that perfectly match your needs. This way, using the AI agent becomes a pleasure rather than just a functional tool.',
]
const HowItWorks = () => {
	const { isBase } = useUI()

	return (
		<Container mt='150px' centerContent p='0 2em' minW='100%' pb='0'>
			<Stack maxW={1400} w='100%' align='center'>
				<Heading
					as='h2'
					mb='0.5em'
					color='accent.200'
					textAlign='center'
					borderBottom='2px solid'
					p='0 1em'
					pb='.25em'
					fontSize='2xl'
				>
					How it works?
				</Heading>
				<VStack spacing='2em'>
					{howItWorksTexts.map((text, index) => {
						const direction = index % 2 === 0 ? 'row' : 'row-reverse'
						return (
							<Fade cascade damping={1} key={index} triggerOnce duration={1000} delay={index * 300}>
								<Stack
									direction={{ base: 'column', sm: direction }}
									justify='space-evenly'
									align='center'
									w='100%'
									spacing='3em'
									p='3em 0'
									borderBottom='1px solid'
									borderColor={index !== 2 ? 'brand.950' : 'transparent'}
								>
									<Box maxW={!isBase && '40%'} minW='200px' pos='relative'>
										<Text textAlign={isBase && 'center'} fontSize='md'>
											{text}
										</Text>
									</Box>
									{!isBase && (
										<Box maxW={250} minW={150} h='100%'>
											<Image
												src={index === 0 ? processorImage : sectionImage}
												filter='drop-shadow(2px 2px 2px #696969FF)'
												w='100%'
												h='100%'
												alt='section image'
											></Image>
										</Box>
									)}
								</Stack>
							</Fade>
						)
					})}
				</VStack>
			</Stack>
		</Container>
	)
}

export default HowItWorks
