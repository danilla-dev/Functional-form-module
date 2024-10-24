import React from 'react'
import {
	Container,
	Heading,
	Stack,
	VStack,
	HStack,
	Box,
	Image,
	Text,
	List,
	ListItem,
	ListIcon,
	OrderedList,
	UnorderedList,
	Card,
	CardBody,
	CardHeader,
} from '@chakra-ui/react'
import { FaUserCog, FaComments, FaPlug } from 'react-icons/fa'

import { Fade } from 'react-awesome-reveal'

import bestFeaturesImg from '../../assets/best-features-img.webp'

import { useUI } from '../../hooks/useUI'

const features = [
	{
		icon: FaUserCog,
		header: 'Personalization',
		text: 'Our AI agent utilizes cutting-edge machine learning algorithms to adapt to your preferences. The more you interact with it, the better it understands your needs and can provide even more personalized recommendations.',
	},
	{
		icon: FaComments,
		header: 'Interactivity',
		text: 'As you engage with the agent, it continuously learns from your choices, refining its understanding of what you like and dislike. This dynamic learning process allows it to anticipate your needs and deliver tailored suggestions that enhance your experience.',
	},
	{
		icon: FaPlug,
		header: 'integrations',
		text: 'Our AI agent is designed to seamlessly integrate with your favorite apps and services. This allows you to access all of your tools and information in one place, streamlining your workflow and saving you time.',
	},
]
const BestFeatures = () => {
	const { isMobile, isDesktop, isTablet } = useUI()

	return (
		<Container
			m={0}
			mb='5em'
			centerContent
			p='5em 2em'
			minW='100%'
			// bgGradient='radial( brand.300 20%, brand.350)'
		>
			<Stack maxW={1400} w='100%' align='center'>
				<Heading
					as='h2'
					fontSize='2xl'
					color='accent.200'
					textAlign='center'
					borderBottom='2px solid'
					p='0 1em'
					pb='.25em'
				>
					Best features
				</Heading>
				<HStack justify='space-evenly' align='center' flexDirection='row-reverse' pos='relative' pt='2em'>
					{isDesktop && (
						<Box w='40%' maxW={400}>
							<Image
								src={bestFeaturesImg}
								w='100%'
								h='100%'
								filter='drop-shadow(2px 2px 2px #B9B6B6FF)'
								alt='Man with desktops around'
							/>
						</Box>
					)}
					<Box maxW={isDesktop && '50%'}>
						<Box>
							<List spacing='1.5em'>
								{features.map((feature, index) => {
									const Icon = feature.icon
									return (
										<ListItem key={index}>
											<Fade key={index} triggerOnce duration={1000} delay={index * 200}>
												<Card
													// bgColor='brand.900'
													bgColor='transparent'
													border='1px solid'
													borderColor='accent.200'
													p='.5em'
													borderRadius={10}
													zIndex={10}
												>
													<CardHeader pb={0}>
														<HStack justify={!isDesktop && 'center'}>
															<ListIcon as={Icon} color='brand.800' fontSize='xl' />
															<Heading as='h3' fontSize='sm' color='brand.800'>
																{feature.header}
															</Heading>
														</HStack>
													</CardHeader>
													<CardBody>
														<Text color='brand.800' fontSize='sm' textAlign={!isDesktop && 'center'}>
															{feature.text}
														</Text>
													</CardBody>
												</Card>
											</Fade>
										</ListItem>
									)
								})}
							</List>
						</Box>
					</Box>
				</HStack>
			</Stack>
		</Container>
	)
}

export default BestFeatures
