import React from 'react'
import { Box, Stack, Text, ButtonGroup, Image, FormControl, Input, FormLabel, FormErrorMessage } from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import { loginInputs } from '../../data/formsConstants'

const LoginFormInputs = ({ control, errors, authError }) => {
	console.log(authError)
	return (
		<>
			{loginInputs.map((input, index) => {
				return (
					<FormControl isRequired key={index} isInvalid={errors[input.name] || authError[input.name]}>
						<FormLabel> {input.label} </FormLabel>
						<Controller
							name={input.name}
							control={control}
							defaultValue={input.defaultValue}
							render={({ field }) => <Input type={input.type} borderColor='accent.300' {...field} size='lg' />}
						/>
						{errors[input.name] && <FormErrorMessage>{errors[input.name].message}</FormErrorMessage>}
						{authError[input.name] && <FormErrorMessage>{authError[input.name]}</FormErrorMessage>}
					</FormControl>
				)
			})}
		</>
	)
}

export default LoginFormInputs
