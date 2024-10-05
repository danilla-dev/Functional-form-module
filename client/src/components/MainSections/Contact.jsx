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

const Contact = ({ display }) => {
	const { isMobile, isDesktop, isTablet } = display
	return (
		<Container m={0} centerContent p='2em 1em' minW='100%' pb='3em'>
			<Stack maxW={1100} w='100%' align='center'>
				<Heading as='h2' mb='0.5em' color='brand.400' textAlign='center' borderBottom='1px solid' w='80%' pb='.25em'>
					Contact
				</Heading>
				<Stack direction='row' w='100%' justify='center' spacing='4em'>
					{isDesktop || isTablet ? (
						<>
							<Box w='50%'>
								<Image
									w='100%'
									h='100%'
									src={contactImg}
									filter='drop-shadow(2px 2px 2px #353535FF)'
									alt='Two mans looking at a robot'
								></Image>
							</Box>
						</>
					) : null}
					<Box
						w={isDesktop ? '50%' : ' 75%'}
						minW={300}
						as='form'
						p='2em'
						borderRadius={10}
						onSubmit={e => e.preventDefault()}
					>
						<VStack spacing='2em'>
							<FormControl isRequired>
								<FormLabel fontSize={['sm', 'md']} __>
									{' '}
									Email address:
								</FormLabel>
								<Input type='email' />
							</FormControl>
							<FormControl isRequired>
								<FormLabel fontSize={['sm', 'md']}>What's your inquiry about?</FormLabel>
								<Select placeholder='Select subject'>
									<option value='Product Information'>Product Information</option>
									<option value='Technical Support'>Technical Support</option>
									<option value='Billing and Payments'>Billing and Payments</option>
									<option value='Troubleshooting'>Troubleshooting</option>
									<option value='Feedback or Suggestions'>Feedback or Suggestions</option>
									<option value='Other'>Other</option>
								</Select>
							</FormControl>
							<FormControl isRequired>
								<FormLabel fontSize={['sm', 'md']}>How can we help?</FormLabel>
								<Textarea resize='vertical' maxH={250} />
							</FormControl>
							<Button
								leftIcon={<IoIosSend />}
								color='brand.400'
								borderColor='accent.50'
								size='lg'
								type='submit'
								boxShadow='xl'
								role='button'
								aria-label='Send Question'
								_hover={{ borderColor: 'brand.500', color: 'brand.500' }}
							>
								Send Question
							</Button>
						</VStack>
					</Box>
				</Stack>
			</Stack>
		</Container>
	)
}

export default Contact
