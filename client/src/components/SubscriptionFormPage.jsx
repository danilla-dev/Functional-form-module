import React, { useState } from 'react'
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
} from '@chakra-ui/react'
import SignUp from './formSteps/SignUp'
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import { motion } from 'framer-motion'

import signUpImage from '../assets/signup-img.webp'

import Details from './formSteps/Details'

const MotionBox = motion(Box)

const steps = [
	{ title: 'First', description: 'Sign up' },
	{ title: 'Second', description: 'Details' },
	{ title: 'Third', description: 'Payment' },
]

const StepperComponent = ({ index }) => {
	return (
		<Box w='95%'>
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

const SubscriptionFormPage = () => {
	const displaySize = useBreakpointValue({
		base: 'base',
		sm: 'mobile',
		md: 'tablet',
		lg: 'desktop',
	})

	const { activeStep, setActiveStep } = useSteps({
		index: 1,
		count: steps.length,
	})

	const isBase = displaySize === 'base'
	const isMobile = displaySize === 'desktop'
	const isTablet = displaySize === 'tablet'
	const isDesktop = displaySize === 'desktop'
	const isWideDesktop = displaySize === 'wide-desktop'

	const display = {
		isMobile,
		isDesktop,
		isTablet,
		isBase,
		isWideDesktop,
	}

	const nextStep = () => setActiveStep(activeStep + 1)
	const prevStep = () => setActiveStep(activeStep - 1)

	const animationVariants = {
		initial: { opacity: 0, x: 100 },
		animate: { opacity: 1, x: 0 },
		exit: { opacity: 0, x: -100 },
	}

	return (
		<Center
			as='section'
			id='subscription-form'
			align='center'
			w='100%'
			h='100%'
			bgGradient='radial( brand.300 20%, brand.350)'
		>
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
				onSubmit={e => e.preventDefault()}
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
							{activeStep === 1 ? <SignUp /> : <Details />}
						</MotionBox>
						<ButtonGroup justifyContent='space-around' w='100%' mt='1.5em'>
							<Button
								isDisabled={activeStep === 1}
								leftIcon={<MdNavigateBefore />}
								color='brand.400'
								bgColor='brand.300'
								borderColor='accent.50'
								size='lg'
								type='submit'
								boxShadow='xl'
								role='button'
								aria-label='Send Question'
								onClick={prevStep}
								_hover={{ borderColor: 'brand.500', color: 'brand.500' }}
							>
								Previous
							</Button>
							<Button
								isDisabled={activeStep === 3}
								rightIcon={<MdNavigateNext />}
								color='brand.400'
								bgColor='brand.300'
								borderColor='accent.50'
								size='lg'
								type='submit'
								boxShadow='xl'
								role='button'
								aria-label='Send Question'
								onClick={nextStep}
								_hover={{ borderColor: 'brand.500', color: 'brand.500' }}
							>
								Next
							</Button>
						</ButtonGroup>
					</Stack>
				</Stack>
			</Box>
		</Center>
	)
}

export default SubscriptionFormPage
