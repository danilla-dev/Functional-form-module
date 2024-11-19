import React, { useState } from 'react'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button,
	Editable,
	EditableInput,
	EditableTextarea,
	EditablePreview,
	Text,
	Box,
	HStack,
	VStack,
	Input,
	InputGroup,
	InputRightElement,
	FormControl,
	FormErrorMessage,
} from '@chakra-ui/react'
import { useIntegration } from '../../hooks/useIntegration'
import { FaRegEyeSlash, FaEye } from 'react-icons/fa'
import { CheckIcon } from '@chakra-ui/icons'
import { useForm, Controller } from 'react-hook-form'
import { useIntegrationsModal } from '../../hooks/useIntegrationsModal'

const IntegrationsModalInput = ({ integration, apiKey, isKeyVisible, isEditing, toggleShowKey, saveKey }) => {
	const { toggleEdit, handleSubmit, control, errors, reset } = useIntegrationsModal({ integration })
	return (
		<FormControl isInvalid={errors.apiKey}>
			<InputGroup size='md'>
				<Controller
					name='apiKey'
					control={control}
					defaultValue={apiKey}
					render={({ field }) => (
						<Input {...field} type={isKeyVisible || isEditing ? 'text' : 'password'} disabled={!isEditing} />
					)}
				/>
				<InputRightElement width='4.5rem'>
					{!isEditing ? (
						<Button bgColor='brand.350' color='brand.100' onClick={toggleShowKey} size='sm' disabled={isEditing}>
							{!isKeyVisible ? <FaRegEyeSlash /> : <FaEye />}
						</Button>
					) : (
						<Button bgColor='brand.350' size='sm' color='brand.100' type='submit' onClick={handleSubmit(saveKey)}>
							<CheckIcon />
						</Button>
					)}
				</InputRightElement>
			</InputGroup>
			<FormErrorMessage>{errors.apiKey && errors.apiKey.message}</FormErrorMessage>
		</FormControl>
	)
}

const IntegrationsModal = ({ integration, isOpen, onClose }) => {
	const { onDeletion } = useIntegration()
	const { toggleShowKey, toggleEdit, saveKey, isEditing, isKeyVisible, handleSubmit, control, errors, reset } =
		useIntegrationsModal({ integration })

	const onSubmit = data => {
		console.log('data', data)
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered size={{ base: 'xl', md: '2xl' }}>
			<ModalOverlay />
			<ModalContent border='1px solid' borderColor='accent.300' bgColor='brand.350' color='brand.100' p='1em'>
				<ModalHeader>{integration.text}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Box as='form' onSubmit={handleSubmit(onSubmit)}>
						<HStack>
							<Text size='md' mr='0.25em'>
								Key
							</Text>
							<IntegrationsModalInput
								integration={integration}
								apiKey={integration.apiKey}
								isKeyVisible={isKeyVisible}
								isEditing={isEditing}
								toggleShowKey={toggleShowKey}
								saveKey={saveKey}
							/>
						</HStack>
					</Box>
				</ModalBody>
				<ModalFooter>
					<Button colorScheme='blue' mr={3} onClick={toggleEdit}>
						{!isEditing ? 'Edit Key' : 'Save Key'}
					</Button>
					<Button
						variant='ghost'
						onClick={onDeletion}
						color='brand.100'
						_hover={{
							color: 'brand.300',
							bgColor: 'brand.100',
						}}
					>
						Delete integration
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default IntegrationsModal
