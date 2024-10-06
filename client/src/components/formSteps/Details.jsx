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

const Checkboxes = ({ control, errors }) => {
	const checkboxesContext = [
		{
			text: 'Calendar management',
			value: 'calendar',
		},
		{
			text: 'Setting reminders',
			value: 'reminders',
		},
		{
			text: 'Data analysis',
			value: 'analysis',
		},
		{
			text: 'Report generation',
			value: 'report',
		},
		{
			text: 'Task automation',
			value: 'task',
		},
	]
	return (
		<FormControl isRequired isInvalid={errors.preferences}>
			<FormLabel fontSize={['sm', 'md']}>Assist preferences: </FormLabel>
			<Controller
				name='preferences'
				control={control}
				defaultValue={[]}
				render={({ field }) => (
					<CheckboxGroup value={field.value} onChange={field.onChange}>
						<Stack spacing={[1, 5]} direction={['column', 'row']} wrap='wrap'>
							{checkboxesContext.map((checkbox, index) => (
								<Checkbox key={index} value={checkbox.value} size='lg' spacing='0.5em'>
									{checkbox.text}
								</Checkbox>
							))}
						</Stack>
					</CheckboxGroup>
				)}
			/>
			{errors && <FormErrorMessage>{errors.preferences && errors.preferences.message}</FormErrorMessage>}
		</FormControl>
	)
}

const Selects = ({ control, errors }) => {
	const selectsContext = [
		{
			label: 'Communication preferences',
			options: ['Daily', 'Hourly', '12-hour'],
			name: 'communicationPreferences',
		},
		{
			label: 'Communication style',
			options: ['Formal', 'Informal'],
			name: 'communicationStyle',
		},
	]
	return (
		<>
			{selectsContext.map((select, index) => (
				<FormControl key={index} isRequired m='1em 0' isInvalid={errors[select.name]}>
					<FormLabel fontSize={['sm', 'md']}>{select.label}: </FormLabel>
					<Controller
						name={select.name}
						control={control}
						defaultValue={select.options[0]}
						render={({ field }) => (
							<Select {...field}>
								{select.options.map((option, index) => (
									<option key={index} value={option} className='option-dark'>
										{option}
									</option>
								))}
							</Select>
						)}
					/>
					{errors && <FormErrorMessage>{errors[select.name] && errors[select.name].message}</FormErrorMessage>}
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
