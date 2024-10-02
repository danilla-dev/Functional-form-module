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
	useBreakpointValue,
} from '@chakra-ui/react'
import { FaUserCog, FaComments, FaPlug } from 'react-icons/fa'

import bestFeaturesImg from '../../assets/best-features-img.png'

const BestFeatures = () => {
	const displaySize = useBreakpointValue({ base: 'base', sm: 'mobile', md: 'tablet', lg: 'desktop' })
	const isMobile = displaySize === 'base'
	const isDesktop = displaySize === 'desktop'

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

	return (
		<Container m={0} centerContent p='3em 2em' minW='100%' pt='2em' bgColor='brand.300'>
			<Stack maxW={1400} w='100%' align='center'>
				<Heading as='h2' mb='0.5em' color='brand.500' textAlign='center' borderBottom='1px solid' w='80%' pb='.25em'>
					Best features
				</Heading>
				<HStack justify='space-between' align='center' pos='relative'>
					{isDesktop && (
						<Box w='35%'>
							<Image src={bestFeaturesImg} w='100%' filter='drop-shadow(2px 2px 2px #B9B6B6FF)' />
						</Box>
					)}
					<Box maxW={isDesktop && '55%'}>
						<Text color='brand.50' mb='1em' textAlign={!isDesktop && 'center'}>
							Discover the powerful features of our AI agent that make it a must-have digital assistant. Designed to
							enhance your daily life, each feature works seamlessly together to provide you with a personalized and
							interactive experience.
						</Text>
						<Box>
							<List spacing='1.5em'>
								{features.map((feature, index) => {
									const Icon = feature.icon
									return (
										<ListItem key={index}>
											<Card bgColor='brand.300' boxShadow={`-5px -5px 10px rgba(12, 1, 58, 0.5)`}>
												<CardHeader>
													<HStack justify='center'>
														<ListIcon as={Icon} color='brand.500' fontSize={38} />
														<Heading as='h3' size='md' color='brand.500'>
															{feature.header}
														</Heading>
													</HStack>
												</CardHeader>
												<CardBody>
													<Text color='brand.50' textAlign={!isDesktop && 'center'}>
														{feature.text}
													</Text>
												</CardBody>
											</Card>
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