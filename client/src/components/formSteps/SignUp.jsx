import React from 'react'

import { FormControl, FormLabel, Input } from '@chakra-ui/react'

const SignUp = () => {
	const inputs = [
		{
			label: 'Email address',
			type: 'email',
		},
		{
			label: 'Password',
			type: 'password',
		},
		{
			label: 'Repeat password',
			type: 'password',
		},
		{
			label: 'Phone number',
			type: 'number',
		},
	]
	return (
		<>
			{inputs.map((input, index) => {
				return (
					<FormControl isRequired key={index}>
						<FormLabel> {input.label} </FormLabel>
						<Input type={input.type} borderColor='accent.300' />
					</FormControl>
				)
			})}
		</>
	)
}

export default SignUp
