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
	FormLabel,
	FormErrorMessage,
	useDisclosure,
	Center,
	Spinner,
} from '@chakra-ui/react'
import { useIntegration } from '../../hooks/useIntegration'
import { CheckIcon } from '@chakra-ui/icons'
import { integrationOptions } from '../../data/formsConstants'
import { motion } from 'framer-motion'
import { FaCircleXmark } from 'react-icons/fa6'
import { HiMiniXMark } from 'react-icons/hi2'
import IntegrationsModal from '../integrationsModal/IntegrationsModal'
import { TiInfoLarge } from 'react-icons/ti'
import { useIntegrationsModal } from '../../hooks/useIntegrationsModal'

import { useForm, Controller } from 'react-hook-form'
import { set } from 'lodash'
import { useToastNotification } from '../../hooks/useToastNotification'

const MotionBox = motion(Box)
const animationVariants = {
	initial: { opacity: 0, x: 100 },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: -100 },
}
const IntegrationCard = ({ integration }) => {
	const { onDeletion } = useIntegration()
	const { toggleShowKey, toggleEdit, saveKey } = useIntegrationsModal({ integration })
	const { onOpen, isOpen, onClose } = useDisclosure()

	return (
		<MotionBox
			key={integration.value}
			variants={animationVariants}
			initial='initial'
			animate='animate'
			exit='exit'
			transition={{ duration: 0.3 }}
		>
			<VStack w={{ base: 110, md: 140 }} justify='space-between' position='relative'>
				<IntegrationsModal integration={integration} isOpen={isOpen} onClose={onClose} />
				<Button
					aria-label='button'
					position='absolute'
					right={0}
					fontSize='lg'
					p={0}
					bgColor='brand.300'
					color='brand.100'
					borderRadius={'0px 5px 0px 5px'}
					_hover={{ bgColor: 'brand.300', border: 'transparent', color: 'accent.200' }}
					onClick={onOpen}
				>
					<TiInfoLarge />
				</Button>
				<Box
					bgColor='brand.100'
					h={{ base: 110, md: 140 }}
					w={{ base: 110, md: 140 }}
					p='2em'
					borderRadius={15}
					overflow='hidden'
				>
					<Image src={integration.img} h='100%' objectFit='contain' alt={integration.alt} />
				</Box>
				<Text textAlign='center' w='100%'>
					{integration.platform}
				</Text>
			</VStack>
		</MotionBox>
	)
}

const IntegrationContainer = () => {
	const {
		userIntegrationsIsLoading,
		userIntegrations,
		postIntegrationLoading,
		deleteIntegrationLoading,
		updateApiKeyLoading,
	} = useIntegration()

	useToastNotification(postIntegrationLoading, 'Success', 'Integration added successfully')
	useToastNotification(updateApiKeyLoading, 'Success', 'Api key updated successfully')
	useToastNotification(deleteIntegrationLoading, 'Success', 'Integration deleted successfully')

	if (userIntegrationsIsLoading) {
		return (
			<Center>
				<Spinner size='xl' />
			</Center>
		)
	}

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
			{userIntegrations.map(integration => (
				<IntegrationCard key={integration.value} integration={integration} />
			))}
		</HStack>
	)
}

const IntegrationForm = () => {
	const { userIntegrations, userIntegrationsRefetch, userIntegrationsData, onSubmit, handleSubmit, control, errors } =
		useIntegration()

	useEffect(() => {
		userIntegrationsRefetch()
	}, [userIntegrationsData])

	return (
		<HStack as='form' onSubmit={handleSubmit(onSubmit)} spacing={3} className='integration-add-form'>
			<HStack spacing={2} w='100%'>
				<FormControl isRequired isInvalid={errors.platform}>
					<Controller
						name='platform'
						control={control}
						render={({ field }) => {
							return (
								<Select
									{...field}
									size='lg'
									placeholder='Select platform'
									// onChange={e => {
									// 	handlePlatformChange(e.target.value, field)
									// }}
								>
									{integrationOptions.map(option => (
										<option
											key={option.value}
											value={option.value}
											disabled={userIntegrations.some(intergration => intergration.value === option.value)}
										>
											{option.text}
										</option>
									))}
								</Select>
							)
						}}
					/>
					{errors.platform && <FormErrorMessage style={{ color: 'red' }}>{errors.platform.message}</FormErrorMessage>}
				</FormControl>
				<FormControl isRequired isInvalid={errors.apiKey}>
					<Controller
						name='apiKey'
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								placeholder='API Key'
								// onChange={e => {
								// 	handleApiKeyChange(e.target.value, field)
								// }}
								size='lg'
							/>
						)}
					/>
					{errors.apiKey && <FormErrorMessage style={{ color: 'red' }}>{errors.apiKey.message}</FormErrorMessage>}
				</FormControl>
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
			className='integrations-section'
			id='dashboard-integrations-section'
			as='section'
		>
			<Card
				border='1px solid'
				borderColor='accent.300'
				bgColor='brand.350'
				color='brand.100'
				p='1em'
				borderRadius={10}
				w='100%'
				className='integrations-card'
			>
				<CardHeader className='integrations-card-header'>
					<Heading size='md' color='accent.300'>
						Integrations
					</Heading>
				</CardHeader>
				<CardBody className='integrations-card-header'>
					<Stack spacing='1em'>
						<HStack></HStack>
						<IntegrationForm />
					</Stack>
					<IntegrationContainer />
				</CardBody>
			</Card>
		</Stack>
	)
}

export default Integrations
