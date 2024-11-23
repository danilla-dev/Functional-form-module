import React from 'react'
import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	FormHelperText,
	List,
	ListItem,
	UnorderedList,
	PinInput,
	PinInputField,
	HStack,
	VStack,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
} from '@chakra-ui/react'
import { Controller } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth'

const VerifyCode = ({ control, errors, authError }) => {
	const { registerLoading } = useAuth()

	return (
		<VStack h='100%' w='100%' justify='space-evenly'>
			{registerLoading === 'success' && (
				<Alert status='success' size='xl'>
					<AlertIcon />
					<AlertTitle fontSize='md' color='black'>
						Account created successfully!
					</AlertTitle>
				</Alert>
			)}
			<FormControl isInvalid={errors.verificationCode || authError}>
				<VStack align='center' justify='center' className='code-subscription-form-step'>
					<FormLabel>Verification code</FormLabel>
					<Controller
						name='verificationCode'
						control={control}
						rules={{
							required: 'Code is required',
							pattern: {
								value: /^[0-9]{6}$/,
								message: 'Code must be 6 digits long',
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<HStack>
								<PinInput value={value} onChange={onChange} onBlur={onBlur} otp size='lg'>
									<PinInputField />
									<PinInputField />
									<PinInputField />
									<PinInputField />
									<PinInputField />
									<PinInputField />
								</PinInput>
							</HStack>
						)}
					/>
					{errors.verificationCode && <FormErrorMessage>{errors.verificationCode.message}</FormErrorMessage>}
					{authError && <FormErrorMessage>{authError}</FormErrorMessage>}
				</VStack>
			</FormControl>
		</VStack>
	)
}

export default VerifyCode
