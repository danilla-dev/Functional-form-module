import React from 'react'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
} from '@chakra-ui/react'
import { useIntegration } from '../../hooks/useIntegration'
import { useIntegrationsModal } from '../../hooks/useIntegrationsModal'
import IntegrationsModalForm from './IntegrationsModalForm'

const IntegrationsModal = ({ integration, isOpen, onClose }) => {
	const { onDeletion } = useIntegration()
	const { toggleShowKey, toggleEdit, saveKey, isEditing, isKeyVisible } = useIntegrationsModal({ integration })

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered size={{ base: 'xl', md: '2xl' }}>
			<ModalOverlay />
			<ModalContent border='1px solid' borderColor='accent.300' bgColor='brand.350' color='brand.100' p='1em'>
				<ModalHeader>{integration.text}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<IntegrationsModalForm
						integration={integration}
						isKeyVisible={isKeyVisible}
						isEditing={isEditing}
						toggleShowKey={toggleShowKey}
						onSubmit={saveKey}
					/>
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
