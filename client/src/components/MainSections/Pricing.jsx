import React from 'react'

import {
	Box,
	Container,
	Image,
	Stack,
	HStack,
	List,
	ListItem,
	ListIcon,
	OrderedList,
	UnorderedList,
	Card,
	CardBody,
	CardHeader,
	Text,
	Heading,
	Center,
} from '@chakra-ui/react'

import { FaCheck, FaTimes } from 'react-icons/fa'

import { Fade, Slide, Hinge, Bounce, Roll, Zoom, Flip, AttentionSeeker } from 'react-awesome-reveal'

import imagePricing from '../../assets/pricing-bg-lg.png'
import imagePricingSM from '../../assets/pricing-bg-sm.png'

const PricingCard = ({ option, display, index }) => {
	const { isMobile, isDesktop, isTablet } = display

	return (
		<ListItem flex={1} key={index} maxW={isDesktop ? 450 : 600} minW={300}>
			<Card
				bgColor='brand.300'
				border={option.best && '5px solid'}
				borderColor={option.best && 'brand.500'}
				p='.5em'
				borderRadius={15}
				boxShadow='dark-lg'
			>
				<CardHeader>
					<Stack justify='center'>
						<Heading as='h3' size='xl' color='brand.100' textAlign='center'>
							{option.name}
						</Heading>
						<Text color='brand.900' textAlign='center'>
							${option.price}/month
						</Text>
					</Stack>
				</CardHeader>
				<CardBody>
					<Text color='brand.50' textAlign='center' mb='2em'>
						{option.description}
					</Text>
					<Text color='brand.900' fontSize='2xl' textAlign='center' m='1em 2em' borderBottom='1px solid'>
						Features:
					</Text>
					<List spacing='1em'>
						{option.features.map((feature, index) => {
							return (
								<ListItem key={index}>
									<HStack align='center' spacing='0.5em'>
										<ListIcon as={FaCheck} color='brand.500' fontSize={24} />
										<Text color='brand.50'>{feature}</Text>
									</HStack>
								</ListItem>
							)
						})}
					</List>
					<Text color='brand.900' fontSize='2xl' textAlign='center' m='1em 2em' borderBottom='1px solid'>
						Limits:
					</Text>
					<List spacing='1em'>
						{option.limits.map((limit, index) => {
							return (
								<ListItem key={index}>
									<HStack align='center' spacing='0.5em'>
										<ListIcon as={FaTimes} color='brand.500' fontSize={24} />
										<Text color='brand.50'>{limit}</Text>
									</HStack>
								</ListItem>
							)
						})}
					</List>
				</CardBody>
			</Card>
		</ListItem>
	)
}

const Pricing = ({ display }) => {
	const { isMobile, isDesktop, isTablet } = display

	const pricingOptions = [
		{
			name: 'Basic',
			price: 9.99,
			description: 'Ideal for casual users who need basic AI assistance in their day-to-day activities.',
			features: [
				'Personalized recommendations based on interactions',
				'Basic Q&A capabilities',
				'Access to AI insights and suggestions',
				'Integration with one platform (e.g., calendar, email)',
			],
			limits: [
				'Up to 50 interactions per month',
				'Limited to text-based interactions only',
				'1 personalized AI workflow',
			],
		},
		{
			name: 'Pro',
			price: 19.99,
			description: 'For power users who want more customization and advanced capabilities from their AI assistant.',
			features: [
				'Everything in Basic Plan',
				'Advanced personalization and in-depth AI learning',
				'Voice command support',
				'Integration with up to 3 platforms (e.g., calendar, email, task management)',
				'Priority support',
			],
			limits: [
				'Up to 200 interactions per month',
				'3 personalized AI workflows',
				'Real-time notifications and updates',
			],
			best: true,
		},
		{
			name: 'Premium',
			price: 39.99,
			description:
				'The ultimate plan for users who need the full potential of AI, with no limitations on interaction and full integration options.',
			features: [
				'Everything in Pro Plan',
				'Unlimited interactions',
				'Advanced analytics and insights on behavior',
				'Full integration with up to 10 platforms (e.g., calendar, email, project management, e-commerce)',
				'AI-driven automation for tasks and reminders',
				'Dedicated customer success manager',
			],
			limits: [
				'Unlimited interactions',
				'Unlimited personalized AI workflows',
				'Real-time voice and text notifications',
			],
		},
	]

	return (
		<Container m={0} p={0} centerContent minW='100%'>
			<Box minW='100%' pos='relative' minH='10%'>
				<Image
					src={!isTablet ? imagePricing : imagePricingSM}
					bgSize='100%'
					w='100%'
					pos='absolute'
					top={0}
					left={0}
					zIndex={5}
				></Image>
			</Box>
			<Stack maxW={1400} w='100%' align='center' pt='15em' zIndex={6}>
				<Heading as='h2' mb='0.5em' color='brand.400' textAlign='center' borderBottom='1px solid' w='80%' pb='.25em'>
					Pricing
				</Heading>
				<List w='100%'>
					<Stack
						direction={isDesktop ? 'row' : 'column'}
						align={isDesktop ? 'start' : 'center'}
						justify='space-between'
						w='100%'
						p='0 1em'
						gap={5}
					>
						<Zoom damping={0.4} cascade duration={2000} triggerOnce fraction={0}>
							{pricingOptions.map((option, index) => {
								return <PricingCard option={option} display={display} key={index} />
							})}
						</Zoom>
					</Stack>
				</List>
			</Stack>
		</Container>
	)
}

export default Pricing
