import React, { useState, useEffect, useRef } from 'react'
import {
	Text,
	Box,
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
	ButtonGroup,
	Image,
	Stack,
	useToast,
} from '@chakra-ui/react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { useUI } from '../hooks/useUI'
import SignUp from './formSteps/SignUp'
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import { IoIosSend } from 'react-icons/io'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import signUpImage from '../assets/signup-img.webp'
import Details from './formSteps/Details'
import VerifyCode from './formSteps/VerifyCode'
import ActionButton from './common/ActionButton'
import { detailsSchema, signUpSchema, validationSchema } from '../utils/YupSchemas'

import useRegister from '../hooks/useRegister'
import { useAuth } from '../hooks/useAuth'
import { useSubscribe } from '../hooks/useSubscribe'

const MotionBox = motion(Box)
const animationVariants = {
	initial: { opacity: 0, x: 100 },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: -100 },
}

const steps = [
	{ title: 'Sign up', description: null },
	{ title: 'Verify code', description: null },
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
	const { error: authError } = useRegister()
	const toast = useToast()
	const { activeStep, setActiveStep } = useSteps({
		initialStep: 0,
		count: steps.length,
	})
	const { currentUser, login, registerUser, logout, isLoading, verifyCode } = useAuth()
	const { saveSubscriptionDetails } = useSubscribe()
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(activeStep === 0 ? signUpSchema : activeStep === 1 ? validationSchema : detailsSchema),
	})

	useEffect(() => {
		const { isVerified, subscription, email } = currentUser
		console.log(currentUser)
		if (email) {
			if (!isVerified) {
				setActiveStep(1)
			}
			if (isVerified && subscription === null) {
				setActiveStep(2)
			}
			if (isVerified && subscription !== null) {
				setActiveStep(3)
			}
		} else {
			setActiveStep(0)
		}
	}, [currentUser])

	// do przeniesienia do osobnego pliku
	const handleSendEmail = async emailData => {
		const emailParams = {
			user_email: emailData.user_email,
			activateToken: emailData.activateToken,
			verificationCode: emailData.verificationCode,
			from_name: 'AiAgent Team',
		}
		emailjs
			.send('service_lz7paam', 'template_xom0uko', emailParams, {
				publicKey: '04XVAlf182bnevLBl',
			})
			.then(
				() => {
					console.log('SUCCESS!')
				},
				error => {
					console.log('FAILED...', error.text)
				}
			)
	}
	const handleRegister = async data => {
		const result = await registerUser.mutateAsync(data)
		if (result.email) {
			const emailData = {
				user_email: result.email,
				activateToken: result.activateToken,
				verificationCode: result.verificationCode,
			}
			try {
				// await handleSendEmail(emailData)
				setActiveStep(1)
			} catch (err) {
				console.log(err)
			}
		}
	}

	const handleVerifyCode = async data => {
		const { verificationCode } = data
		const result = await verifyCode.mutateAsync({ verificationCode, email: currentUser.email })
		if (result.isVerified) {
			setActiveStep(2)
		}
	}

	const handleSaveDetails = async data => {
		const result = await saveSubscriptionDetails.mutateAsync(data)
		if (result.message === 'Subscription created') {
			setActiveStep(3)
		}
	}

	const nextStep = async data => {
		switch (activeStep) {
			case 0:
				handleRegister(data)
				break
			case 1:
				handleVerifyCode(data)
				break
			case 2:
				handleSaveDetails(data)
				break
			default:
				toast({
					title: 'Sukces!',
					description: 'Formularz został pomyślnie przesłany.',
					status: 'success',
					duration: 5000,
					isClosable: true,
				})
		}
	}

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
				<Stack w={isDesktop || isTablet ? '50%' : '100%'} align='center' justify='space-between'>
					{currentUser && (
						<Text fontSize='md' p='0.5em 0'>
							{currentUser.email}
						</Text>
					)}
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
						{activeStep === 0 && <SignUp control={control} errors={errors} authError={authError} />}
						{activeStep === 1 && <VerifyCode control={control} errors={errors} />}
						{activeStep === 2 && <Details control={control} errors={errors} />}
					</MotionBox>

					<ButtonGroup justifyContent='space-around' w='100%' mt='1.5em'>
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
