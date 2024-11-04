import React, { useState } from 'react'
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
import { useSubscribe } from '../../hooks/useSubscribe'
import { useAuth } from '../../hooks/useAuth'
import { CheckIcon } from '@chakra-ui/icons'
import { integrationOptions } from '../../data/formsConstants'

const IntegrationContainer = ({ integrations }) => (
	<HStack justify='center' gap='2em' p='5em 0'>
		{integrations.map(integration => (
			<VStack key={integration.value} w={100} justify='space-between'>
				<Box bgColor='brand.100' h={100} w={100} p='0.25em'>
					<Image src={integration.img} h='100%' objectFit='contain' />
				</Box>
				<Text textAlign='center' w='100%'>
					{integration.platform}
				</Text>
			</VStack>
		))}
	</HStack>
)

const IntegrationForm = ({ options, userIntegrations, onAddIntegration }) => {
	const [platform, setPlatform] = useState('')
	const [apiKey, setApiKey] = useState('')

	const handleSubmit = e => {
		e.preventDefault()
		if (platform && apiKey) {
			onAddIntegration({ platform, apiKey })
			setPlatform('')
			setApiKey('')
		}
	}

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
						{options.map(option => (
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
	const [userIntegrations, setUserIntegrations] = useState([])

	const integrations = integrationOptions.filter(option => userIntegrations.includes(option.value))

	const handleAddIntegration = newIntegration => {
		setUserIntegrations([...userIntegrations, newIntegration.platform])
	}

	return (
		<Stack
			maxW={1400}
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
							<Text w={300}>Platform</Text>
							<Text>API Key</Text>
						</HStack>
						<IntegrationForm
							options={integrationOptions}
							userIntegrations={userIntegrations}
							onAddIntegration={handleAddIntegration}
						/>
					</Stack>
					<IntegrationContainer integrations={integrations} />
				</CardBody>
			</Card>
		</Stack>
	)
}

export default Integrations
