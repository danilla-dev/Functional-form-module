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
	VStack,
	Button,
	CardFooter,
} from '@chakra-ui/react'

import { FaCheck, FaTimes } from 'react-icons/fa'

import ActionButton from '../common/ActionButton'

import { useUI } from '../../hooks/useUI'
import { useSubscribe } from '../../hooks/useSubscribe'
import { useNavigate } from 'react-router-dom'

const Features = ({ option }) => {
	return (
		<>
			<Text color='accent.300' fontSize='lg' textAlign='center' m='.5em 0' borderBottom='1px solid'>
				Features:
			</Text>
			<List spacing='1em'>
				{option.features.map((feature, index) => {
					return (
						<ListItem key={index}>
							<HStack align='center' spacing='0.5em'>
								<ListIcon as={FaCheck} color='accent.300' fontSize={14} />
								<Text color='brand.50' fontSize='sm'>
									{feature}
								</Text>
							</HStack>
						</ListItem>
					)
				})}
			</List>
		</>
	)
}

const Limits = ({ option }) => {
	return (
		<>
			<Text color='accent.300' fontSize='lg' textAlign='center' m='.5em 0' borderBottom='1px solid'>
				Limits:
			</Text>
			<List spacing='1em'>
				{option.limits.map((limit, index) => {
					return (
						<ListItem key={index}>
							<HStack align='center' spacing='0.5em'>
								<ListIcon as={FaTimes} color='accent.300' fontSize={14} />
								<Text color='brand.50' fontSize='md'>
									{limit}
								</Text>
							</HStack>
						</ListItem>
					)
				})}
			</List>
		</>
	)
}

const PricingCard = ({ option, index }) => {
	const { isMobile, isDesktop, isTablet } = useUI()
	const navigate = useNavigate()

	return (
		<ListItem flex={1} key={index} w={isDesktop ? 350 : '100%'} minW={300} m='0 1em' maxW={isDesktop ? 500 : 700}>
			<Card
				bgColor='brand.300'
				border={option.best ? '5px solid' : '2px solid'}
				borderColor={'accent.300'}
				p='1em .5em'
				borderRadius={15}
				boxShadow='dark-lg'
				h={isDesktop && 800}
				bgGradient='radial( brand.300 20%, brand.350)'
				transform={option.best & isDesktop && 'scale(1.05)'}
			>
				<CardHeader>
					<Stack justify='center'>
						<Heading as='h3' size='lg' color='brand.100' textAlign='center' m={0}>
							{option.name}
						</Heading>
						<Text color='accent.300' fontSize='md' textAlign='center'>
							${option.price}/month
						</Text>
					</Stack>
				</CardHeader>
				<CardBody>
					<Text color='brand.50' fontSize='md' mb='1em'>
						{option.description}
					</Text>
					<Features option={option} />
					<Limits option={option} />
				</CardBody>
				<CardFooter justify='center'>
					<ActionButton
						text='Get Started'
						icon={null}
						action={() => navigate('/subscription?plan=' + option.name.toLowerCase())}
						ariaLabel='Get subscription'
						priority='high'
						type='button'
					/>
				</CardFooter>
			</Card>
		</ListItem>
	)
}

const Pricing = () => {
	const { isMobile, isDesktop, isTablet } = useUI()
	const { pricingOptions } = useSubscribe()

	return (
		<Container m={0} p={0} pb='7em' centerContent minW='100%' position='relative'>
			<Stack maxW={1400} w='100%' align='center' pt='2em' zIndex={10} position='relative'>
				<Heading as='h2' mb='1em' color='accent.300' textAlign='center' borderBottom='3px solid' w='80%' pb='.25em'>
					Pricing
				</Heading>
				<List w='100%'>
					<Stack
						direction={isDesktop ? 'row' : 'column'}
						align={isDesktop ? 'start' : 'center'}
						justify='center'
						w='100%'
						p='0 1em'
						gap={5}
						flex={1}
						as='li'
					>
						{pricingOptions.map((option, index) => {
							return <PricingCard option={option} key={index} />
						})}
					</Stack>
				</List>
			</Stack>
		</Container>
	)
}

export default Pricing
