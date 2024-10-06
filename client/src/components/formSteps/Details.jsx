import React from 'react'

import { FormControl, FormLabel, Input, Checkbox, CheckboxGroup, Stack, Select, Box } from '@chakra-ui/react'

const Checkboxes = params => {
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
		<FormControl isRequired>
			<FormLabel fontSize={['sm', 'md']}>Assist preferences: </FormLabel>
			<CheckboxGroup>
				<Stack spacing={[1, 5]} direction={['column', 'row']} wrap='wrap'>
					{checkboxesContext.map((checkbox, index) => (
						<Checkbox key={index} value={checkbox.value} size='lg' spacing='0.5em'>
							{checkbox.text}
						</Checkbox>
					))}
				</Stack>
			</CheckboxGroup>
		</FormControl>
	)
}

const Selects = () => {
	const selectsContext = [
		{
			label: 'Communication preferences',
			options: ['Daily', 'Hourly', '12-hour'],
		},
		{
			label: 'Communication style',
			options: ['Formal', 'Informal'],
		},
	]
	return (
		<>
			{selectsContext.map((select, index) => (
				<FormControl key={index} isRequired m='1em 0'>
					<FormLabel fontSize={['sm', 'md']}>{select.label}: </FormLabel>
					<Select>
						{select.options.map((option, index) => (
							<option key={index} value={option} className='option-dark'>
								{option}
							</option>
						))}
					</Select>
				</FormControl>
			))}
		</>
	)
}

const Details = () => {
	return (
		<Box w='100%' h='100%'>
			<Checkboxes />
			<Selects />
		</Box>
	)
}

export default Details
