import React, { useEffect, useState } from 'react'
import {
	Stack,
	Box,
	Text,
	VStack,
	Heading,
	HStack,
	Select,
	Input,
	Button,
	FormControl,
	Image,
	Card,
	CardHeader,
	CardBody,
} from '@chakra-ui/react'
import { useIntegration } from '../../hooks/useIntegration'
import { CheckIcon } from '@chakra-ui/icons'
import { integrationOptions } from '../../data/formsConstants'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)
const animationVariants = {
	initial: { opacity: 0, x: 100 },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: -100 },
}
const IntegrationContainer = () => {
	const { integrations } = useIntegration()
	return (
		<HStack
			justify='center'
			gap='2em'
			p='5em 0'
			className='integrations-container'
			w='90%'
			ml='auto'
			mr='auto'
			flexWrap='wrap'
		>
			{integrations.map(integration => (
				<MotionBox
					variants={animationVariants}
					initial='initial'
					animate='animate'
					exit='exit'
					transition={{ duration: 0.3 }}
				>
					<VStack key={integration.value} w={100} justify='space-between'>
						boxShadow='0px 0px 16px 4px rgba(0,125,121,0.25)'
						<Box bgColor='brand.100' h={100} w={100} p='1em' borderRadius={15} overflow='hidden'>
							<Image src={integration.img} h='100%' objectFit='contain' alt={integration.alt} />
						</Box>
						<Text textAlign='center' w='100%'>
							{integration.platform}
						</Text>
					</VStack>
				</MotionBox>
			))}
		</HStack>
	)
}

const IntegrationForm = () => {
	const {} = useIntegration()
	const {
		userIntegrations,
		userIntegrationsRefetch,
		userIntegrationsData,
		platform,
		setPlatform,
		apiKey,
		setApiKey,
		handleSubmit,
	} = useIntegration()

	useEffect(() => {
		userIntegrationsRefetch()
	}, [userIntegrationsData])

	return (
		<HStack as='form' onSubmit={handleSubmit} spacing={3}>
			<FormControl>
				<HStack spacing={2}>
					<Select
						maxW={300}
						size='lg'
						placeholder='Select platform'
						value={platform}
						onChange={e => setPlatform(e.target.value)}
					>
						{integrationOptions.map(option => (
							<option key={option.value} value={option.value} disabled={userIntegrations.includes(option.value)}>
								{option.text}
							</option>
						))}
					</Select>
					<Input placeholder='API Key' size='lg' value={apiKey} onChange={e => setApiKey(e.target.value)} />
					<Button
						type='submit'
						size='lg'
						bgColor='transparent'
						border='1px solid'
						borderColor='accent.200'
						_hover={{ backgroundColor: 'transparent' }}
					>
						<CheckIcon color='accent.200' />
					</Button>
				</HStack>
			</FormControl>
		</HStack>
	)
}

const Integrations = () => {
	return (
		<Stack
			maxW={1600}
			w='100%'
			flexDir='row'
			flexWrap='wrap'
			justify={{ base: 'center', md: 'space-between' }}
			spacing='2em'
		>
			<Card
				border='1px solid'
				borderColor='accent.300'
				bgColor='brand.350'
				color='brand.100'
				p='1em'
				borderRadius={10}
				w='100%'
			>
				<CardHeader>
					<Heading size='md' color='accent.300'>
						Integrations
					</Heading>
				</CardHeader>
				<CardBody>
					<Stack spacing='1em'>
						<HStack>
							<Text minW={120} w='50%' maxW={300}>
								Platform
							</Text>
							<Text>API Key</Text>
						</HStack>
						<IntegrationForm />
					</Stack>
					<IntegrationContainer />
				</CardBody>
			</Card>
		</Stack>
	)
}

export default Integrations
