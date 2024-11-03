import React from 'react'
import {
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	CheckboxGroup,
	Stack,
	Select,
	Box,
	FormErrorMessage,
} from '@chakra-ui/react'
import { Controller } from 'react-hook-form'
import { checkboxesContext, selectsContext } from '../../data/formsConstants'

const Checkboxes = ({ control, errors }) => {
	return (
		<FormControl isRequired isInvalid={!!errors.preferences}>
			<FormLabel fontSize={['sm', 'md']}>Assist preferences:</FormLabel>
			<Controller
				name='preferences'
				control={control}
				defaultValue={[]}
				render={({ field }) => (
					<CheckboxGroup value={field.value} onChange={field.onChange}>
						<Stack spacing={[1, 5]} direction={['column', 'row']} wrap='wrap'>
							{checkboxesContext.map(checkbox => (
								<Checkbox key={checkbox.value} value={checkbox.value} size='lg' spacing='0.5em'>
									{checkbox.text}
								</Checkbox>
							))}
						</Stack>
					</CheckboxGroup>
				)}
			/>
			<FormErrorMessage>{errors.preferences?.message}</FormErrorMessage>
		</FormControl>
	)
}

const Selects = ({ control, errors }) => {
	return (
		<>
			{selectsContext.map(select => (
				<FormControl key={select.name} isRequired m='1em 0' isInvalid={!!errors[select.name]}>
					<FormLabel fontSize={['sm', 'md']}>{select.label}:</FormLabel>
					<Controller
						name={select.name}
						control={control}
						defaultValue={select.options[0]}
						render={({ field }) => (
							<Select {...field}>
								{select.options.map(option => (
									<option key={option} value={option} className='option-dark'>
										{option}
									</option>
								))}
							</Select>
						)}
					/>
					<FormErrorMessage>{errors[select.name]?.message}</FormErrorMessage>
				</FormControl>
			))}
		</>
	)
}

const Details = ({ control, errors }) => {
	return (
		<Box w='100%' h='100%'>
			<Checkboxes control={control} errors={errors} />
			<Selects control={control} errors={errors} />
		</Box>
	)
}

export default Details
