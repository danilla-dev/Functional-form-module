import React from 'react'
import {
	Box,
	HStack,
	Text,
	Input,
	InputGroup,
	InputRightElement,
	FormControl,
	FormErrorMessage,
	Button,
} from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import { FaRegEyeSlash, FaEye } from 'react-icons/fa'
import { CheckIcon } from '@chakra-ui/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { editApiKeySchema } from '../../utils/YupSchemas'

const IntegrationsModalForm = ({ integration, isKeyVisible, isEditing, toggleShowKey, onSubmit }) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(editApiKeySchema),
		defaultValues: {
			apiKey: integration.apiKey,
		},
	})

	return (
		<Box as='form' onSubmit={handleSubmit(onSubmit)}>
			<HStack>
				<Text size='md' mr='0.25em'>
					Key
				</Text>
				<FormControl isInvalid={errors.apiKey}>
					<InputGroup size='md'>
						<Controller
							name='apiKey'
							control={control}
							defaultValue={integration.apiKey}
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
								<Button bgColor='brand.350' size='sm' color='brand.100' type='submit'>
									<CheckIcon />
								</Button>
							)}
						</InputRightElement>
					</InputGroup>
					<FormErrorMessage>{errors.apiKey && errors.apiKey.message}</FormErrorMessage>
				</FormControl>
			</HStack>
		</Box>
	)
}

export default IntegrationsModalForm
