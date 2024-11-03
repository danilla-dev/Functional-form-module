import React from 'react'
import {
	Box,
	Heading,
	Image,
	Stack,
	Text,
	VStack,
	Container,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
	Select,
	Button,
	Textarea,
	Divider,
} from '@chakra-ui/react'
import { IoIosSend } from 'react-icons/io'
import contactImg from '../../assets/contact-img.webp'
import ActionButton from '../common/ActionButton'

import { useUI } from '../../hooks/useUI'
import { subjectsOptions } from '../../data/mainSectionConstants'

const Contact = () => {
	const { isMobile, isDesktop, isTablet } = useUI()

	return (
		<Container m={0} centerContent p='2em 1em' minW='100%' pb='3em'>
			<Stack maxW={1100} w='100%' align='center'>
				<Heading
					as='h2'
					mb='0.5em'
					color='accent.300'
					textAlign='center'
					borderBottom='2px solid'
					p='0 1em'
					pb='.25em'
					fontSize='2xl'
				>
					Contact
				</Heading>
				<Stack direction='row' w='100%' justify='space-evenly' spacing='4em' pt='2em'>
					{isDesktop || isTablet ? (
						<Box w='30%'>
							<Image
								w='100%'
								h='100%'
								src={contactImg}
								filter='drop-shadow(2px 2px 2px #9193FFFF)'
								alt='Two mans looking at a robot'
							></Image>
						</Box>
					) : null}
					<Box
						w={{ base: '75%', lg: '40%' }}
						minW={300}
						as='form'
						borderRadius={10}
						onSubmit={e => e.preventDefault()}
						color='brand.50'
					>
						<VStack spacing='2em'>
							<FormControl isRequired>
								<FormLabel fontSize={['sm', 'md']}>Email address:</FormLabel>
								<Input type='email' borderColor='accent.300' />
							</FormControl>
							<FormControl isRequired>
								<FormLabel fontSize={['sm', 'md']}>What's your inquiry about?</FormLabel>
								<Select placeholder='Select subject' borderColor='accent.300'>
									{subjectsOptions.map((option, index) => (
										<option key={index} value={option.value}>
											{option.label}
										</option>
									))}
								</Select>
							</FormControl>
							<FormControl isRequired>
								<FormLabel fontSize={['sm', 'md']}>How can we help?</FormLabel>
								<Textarea resize='vertical' maxH={250} borderColor='accent.300' />
							</FormControl>
							<ActionButton
								text='Send question'
								icon={<IoIosSend />}
								action={e => e.preventDefault()}
								ariaLabel='Send question'
								priority='low'
								type='submit'
								content={null}
								isDisabled={false}
								iconPosition='left'
							/>
						</VStack>
					</Box>
				</Stack>
			</Stack>
		</Container>
	)
}

export default Contact
