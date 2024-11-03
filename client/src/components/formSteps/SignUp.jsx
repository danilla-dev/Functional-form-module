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
import { WarningTwoIcon, CheckCircleIcon } from '@chakra-ui/icons'
import { Controller } from 'react-hook-form'
import { signupInputs, passwordRequirements } from '../../data/formsConstants'

const PasswordHelperText = ({ value }) => (
	<FormHelperText color='brand.100' textAlign='left'>
		Password must contain:
		<UnorderedList>
			<List color='brand.100'>
				{passwordRequirements.map((requirement, index) => (
					<ListItem key={index}>
						{value.match(requirement.regExp) ? (
							<CheckCircleIcon color='green.500' mr='0.5em' />
						) : (
							<WarningTwoIcon color='red.500' mr='0.5em' />
						)}
						{requirement.text}
					</ListItem>
				))}
			</List>
		</UnorderedList>
	</FormHelperText>
)

const FormInput = ({ input, control, errors, authError }) => (
	<FormControl isRequired isInvalid={errors[input.name] || (input.name === 'email' && authError)}>
		<FormLabel>{input.label}</FormLabel>
		<Controller
			name={input.name}
			control={control}
			defaultValue={input.defaultValue}
			render={({ field }) => (
				<>
					<Input type={input.type} borderColor='accent.300' {...field} />
					{input.name === 'password' && <PasswordHelperText value={field.value} />}
				</>
			)}
		/>
		{errors[input.name] && <FormErrorMessage>{errors[input.name].message}</FormErrorMessage>}
		{input.name === 'email' && authError && <FormErrorMessage>{authError}</FormErrorMessage>}
	</FormControl>
)

const SignUp = ({ control, errors, authError }) => {
	return (
		<>
			{signupInputs.map((input, index) => (
				<FormInput key={index} input={input} control={control} errors={errors} authError={authError} />
			))}
		</>
	)
}

export default SignUp
