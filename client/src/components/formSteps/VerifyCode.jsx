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
} from '@chakra-ui/react'
import { useAuth } from '../../hooks/useAuth'
import { useUI } from '../../hooks/useUI'
import { Controller } from 'react-hook-form'

const VerifyCode = ({ control, errors, authError }) => {
	console.log(errors)
	return (
		<FormControl isInvalid={errors.verificationCode || authError}>
			<VStack align='center' justify='center'>
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
	)
}

export default VerifyCode
