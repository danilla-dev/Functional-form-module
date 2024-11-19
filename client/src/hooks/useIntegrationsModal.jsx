import { useState } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import { useIntegration } from './useIntegration'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { integrationSchema } from '../utils/yupSchemas'
export const useIntegrationsModal = ({ integration }) => {
	const [isKeyVisible, setIsKeyVisible] = useState()
	const [isEditing, setIsEditing] = useState()
	const { handleUpdateApiKey, updateApiKey } = useIntegration()

	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(integrationSchema),
		defaultValues: {
			apiKey: integration.apiKey,
		},
	})

	console.log('isKeyVisible', isKeyVisible)
	console.log('isEditing', isEditing)

	const toggleShowKey = () => {
		setIsKeyVisible(prevState => !prevState)
		console.log('integration.apiKey', integration.apiKey)
	}

	const toggleEdit = () => {
		setIsEditing(prevState => !prevState)
	}

	const saveKey = async data => {
		console.log('saveKey')
		console.log('formData', data)
		await handleUpdateApiKey({ data: { apiKey: '123123123123123', platform: integration.value }, updateApiKey })
		toggleEdit()
	}

	return {
		toggleShowKey,
		toggleEdit,
		saveKey,
		isEditing,
		isKeyVisible,
		handleSubmit,
		control,
		errors,
		reset,
	}
}
