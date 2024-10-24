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
			mb={{ base: 0, md: '-15em' }}
			centerContent
			p='.5em'
			minW='100%'
			bgColor={{ base: 'transparent', md: 'brand.900' }}
		>
			<Stack maxW={1400} w='100%' align='center'>
				{!isMobile && !isTablet && (
					<Heading
						as='h2'
						fontSize='2xl'
						color={{ base: 'accent.200', md: 'brand.200' }}
						textAlign='center'
						borderBottom='2px solid'
						p='0 1em'
						pb='.25em'
						mb='1em'
					>
						Best features
					</Heading>
				)}
				<HStack justify='space-evenly' align='center' flexDirection='row-reverse' pos='relative' pb='2em'>
					{/* {isDesktop && (
						<Box w='40%' maxW={400}>
							<Image
								src={bestFeaturesImg}
								w='100%'
								h='100%'
								filter='drop-shadow(2px 2px 2px #B9B6B6FF)'
								alt='Man with desktops around'
							/>
						</Box>
					)} */}
					<Box w='100%'>
						<List
							spacing='1.5em'
							display='flex'
							flexDirection={{ base: 'column', md: 'row' }}
							justifyContent='center'
							alignItems='center'
							gap='1em'
						>
							{features.map((feature, index) => {
								const Icon = feature.icon
								return (
									<ListItem key={index} h={{ md: 270, lg: 220, xl: 180 }} w={{ base: '80%', md: '33%' }}>
										<Card
											bgColor='brand.900'
											border='1px solid'
											borderColor='accent.200'
											p='.5em'
											borderRadius={10}
											zIndex={10}
											h='100%'
											boxShadow='lg'
										>
											<CardHeader pb={0}>
												<HStack justify={!isDesktop && 'center'}>
													<ListIcon as={Icon} color='brand.200' fontSize='xl' />
													<Heading as='h3' fontSize='sm' color='brand.200'>
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
									</ListItem>
								)
							})}
						</List>
					</Box>
				</HStack>
			</Stack>
		</Container>
	)
}

export default BestFeatures
