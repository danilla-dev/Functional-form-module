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
} from '@chakra-ui/react'
import { Controller } from 'react-hook-form'

const SignUp = ({ control, errors, authError }) => {
	const inputs = [
		{
			label: 'Email address',
			type: 'email',
			name: 'email',
			defaultValue: '',
		},
		{
			label: 'Password',
			type: 'password',
			name: 'password',
			defaultValue: '123456789Ab.',
		},
		{
			label: 'Repeat password',
			type: 'password',
			name: 'confirmPassword',
			defaultValue: '123456789Ab.',
		},
		{
			label: 'Phone number',
			type: 'number',
			name: 'phoneNumber',
			defaultValue: 56486,
		},
	]
	console.log(authError)
	return (
		<>
			{inputs.map((input, index) => {
				return (
					<FormControl isRequired key={index} isInvalid={errors[input.name] || (input.name === 'email' && authError)}>
						<FormLabel> {input.label} </FormLabel>
						<Controller
							name={input.name}
							control={control}
							defaultValue={input.defaultValue}
							render={({ field }) => <Input type={input.type} borderColor='accent.300' {...field} />}
						/>
						{input.name === 'password' && (
							<FormHelperText color='brand.100' textAlign='left'>
								Password must contain:
								<UnorderedList>
									<List color='brand.100'>
										<ListItem>at least 8 characters</ListItem>
										<ListItem>one uppercase</ListItem>
										<ListItem>one lowercase</ListItem>
										<ListItem>one number</ListItem>
										<ListItem>special character</ListItem>
									</List>
								</UnorderedList>
							</FormHelperText>
						)}
						{errors && <FormErrorMessage>{errors[input.name] && errors[input.name].message}</FormErrorMessage>}

						{input.name === 'email' && authError && <FormErrorMessage>{authError}</FormErrorMessage>}
					</FormControl>
				)
			})}
		</>
	)
}

export default SignUp
