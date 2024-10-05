import React from 'react'

import { FormControl, FormLabel, Input, Checkbox, CheckboxGroup, Stack, Select, Box } from '@chakra-ui/react'

const Details = () => {
	return (
		<Box w='100%' h='100%'>
			<FormControl isRequired m='1em 0'>
				<FormLabel fontSize={['sm', 'md']}>Assist preferences: </FormLabel>
				<CheckboxGroup>
					<Stack spacing={[1, 5]} direction={['column', 'row']} wrap='wrap'>
						<Checkbox value='calendar'>Calendar management</Checkbox>
						<Checkbox value='reminders'>Setting reminders</Checkbox>
						<Checkbox value='analysis'>Data analysis</Checkbox>
						<Checkbox value='report'>Report generation</Checkbox>
						<Checkbox value='task'>Task automation</Checkbox>
					</Stack>
				</CheckboxGroup>
			</FormControl>
			{/* ------------------------------- */}
			<FormControl isRequired m='1em 0'>
				<FormLabel fontSize={['sm', 'md']}>Communication preferences: </FormLabel>
				<Select>
					<option value='daily' className='option-dark'>
						Daily
					</option>
					<option value='hourly' className='option-dark'>
						Hourly
					</option>
					<option value='12-hour' className='option-dark'>
						Every 12 hours
					</option>
				</Select>
			</FormControl>
			{/* ------------------------------- */}
			<FormControl isRequired m='1em 0'>
				<FormLabel fontSize={['sm', 'md']}>Communication style: </FormLabel>
				<Select>
					<option value='formal' className='option-dark'>
						Formal
					</option>
					<option value='informal' className='option-dark'>
						Informal
					</option>
				</Select>
			</FormControl>
		</Box>
	)
}

export default Details
