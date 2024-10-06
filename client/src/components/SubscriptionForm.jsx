import React, { useState, useEffect } from 'react'
import {
	Flex,
	Center,
	Box,
	Container,
	VStack,
	FormControl,
	Input,
	FormLabel,
	Step,
	StepDescription,
	StepIcon,
	StepIndicator,
	StepNumber,
	StepSeparator,
	StepStatus,
	StepTitle,
	Stepper,
	useSteps,
	Button,
	ButtonGroup,
	Image,
	HStack,
	Stack,
	useBreakpointValue,
	useToast,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useUI } from '../hooks/useUI'
import SignUp from './formSteps/SignUp'
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import { IoIosSend } from 'react-icons/io'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import signUpImage from '../assets/signup-img.webp'
import Details from './formSteps/Details'
import ActionButton from './common/ActionButton'
import { detailsSchema, signUpSchema } from '../utils/YupSchemas'

import useRegister from '../hooks/useRegister'
import { useAuth } from '../hooks/useAuth'

const MotionBox = motion(Box)
const animationVariants = {
	initial: { opacity: 0, x: 100 },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: -100 },
}

const steps = [
	{ title: 'Sign up', description: null },
	{ title: 'Details', description: null },
	{ title: 'Payment', description: null },
]

const StepperComponent = ({ index }) => {
	return (
		<Box w='95%' mb='1em'>
			<Stepper index={index} size='md'>
				{steps.map((step, index) => (
					<Step key={index}>
						<StepIndicator>
							<StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
						</StepIndicator>
						<Box flexShrink='0'>
							<StepTitle>{step.title}</StepTitle>
							<StepDescription>{step.description}</StepDescription>
						</Box>
						<StepSeparator />
					</Step>
				))}
			</Stepper>
		</Box>
	)
}

const SubscriptionForm = () => {
	const { isDesktop, isTablet } = useUI()
	const { handleRegister, error: authError, loading } = useRegister()
	const toast = useToast()
	const { activeStep, setActiveStep } = useSteps({
		initialStep: 0,
		count: steps.length,
	})
	const { currentUser } = useAuth()

	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(activeStep === 0 ? signUpSchema : detailsSchema),
	})

	useEffect(() => {
		if (currentUser && currentUser.email) {
			setActiveStep(1)
		}
	}, currentUser)

	
	const handleRegisterUser = async data => {
		const result = await handleRegister(data)
		if (result === 'success') {
			setActiveStep(1)
		}
	}

	const nextStep = async data => {
		if (activeStep === 0) {
			handleRegisterUser(data)
		} else if (activeStep === 1) {
			console.log(activeStep)
		} else {
			toast({
				title: 'Sukces!',
				description: 'Formularz został pomyślnie przesłany.',
				status: 'success',
				duration: 5000,
				isClosable: true,
			})
		}
	}

	const prevStep = () => setActiveStep(activeStep - 1)

	return (
		<Box
			as='form'
			maxW={1200}
			w='90%'
			maxH='100vh'
			border='1px solid'
			borderColor='accent.300'
			p='2em 1em'
			borderRadius={10}
			bgColor='brand.300'
			color='brand.100'
			boxShadow='dark-lg'
			onSubmit={handleSubmit(nextStep)}
		>
			<Stack spacing='2em' direction={{ sm: 'column', md: 'row' }}>
				{isTablet || isDesktop ? (
					<Box w='50%' h='100%' m='auto 0'>
						<Image h='100%' w='auto' src={signUpImage} />
					</Box>
				) : null}
				<Stack w={isDesktop || isTablet ? '50%' : '100%'} align='center' justify='space-evenly'>
					<StepperComponent index={activeStep} />
					<MotionBox
						w='100%'
						key={activeStep}
						variants={animationVariants}
						initial='initial'
						animate='animate'
						exit='exit'
						transition={{ duration: 0.3 }}
					>
						{activeStep === 0 ? (
							<SignUp control={control} errors={errors} authError={authError} />
						) : (
							<Details control={control} errors={errors} authError={authError} />
						)}
					</MotionBox>

					<ButtonGroup justifyContent='space-around' w='100%' mt='1.5em'>
						<ActionButton
							text='Previous'
							icon={<MdNavigateBefore />}
							action={prevStep}
							ariaLabel='Send Question'
							priority='low'
							type='button'
							content={null}
							isDisabled={activeStep === 0}
							iconPosition='left'
						/>
						<ActionButton
							text={activeStep === 2 ? 'Submit' : 'Next'}
							icon={activeStep === 2 ? <IoIosSend /> : <MdNavigateNext />}
							action={handleSubmit(nextStep)}
							ariaLabel='Send Question'
							priority={activeStep === 2 ? 'high' : 'low'}
							type='button'
							content={null}
							isDisabled={false}
							iconPosition='right'
						/>
					</ButtonGroup>
				</Stack>
			</Stack>
		</Box>
	)
}

export default SubscriptionForm
