import React from 'react'
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
} from '@chakra-ui/react'
import { useIntegration } from '../../hooks/useIntegration'
import { FaRegEyeSlash } from 'react-icons/fa'

const IntegrationsModal = ({ isOpen, onClose, onOpen }) => {
	const { onDeletion } = useIntegration()

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Modal Title</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<HStack>
						<Text size='md' mr='1em'>
							Key
						</Text>
						<Editable defaultValue='************' border='1px solid black' flex={1} p='0.5em' borderRadius={5}>
							<EditablePreview />
							<EditableInput />
						</Editable>
						<Button bgColor='transparent'>
							<FaRegEyeSlash />
						</Button>
					</HStack>
				</ModalBody>
				<ModalFooter>
					<Button colorScheme='blue' mr={3} onClick={onClose}>
						Close
					</Button>
					<Button variant='ghost' onClick={onDeletion}>
						Delete integration
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default IntegrationsModal
