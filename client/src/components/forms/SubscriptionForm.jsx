import React, { useState, useEffect, useRef } from 'react'
import { Text, Box, useSteps, ButtonGroup, Image, Stack, useToast } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useUI } from '../../hooks/useUI'
import SignUp from '../formSteps/SignUp'
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import { IoIosSend } from 'react-icons/io'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Details from '../formSteps/Details'
import registerImg from '../../assets/register-img.webp'
import VerifyCode from '../formSteps/VerifyCode'
import ActionButton from '../common/ActionButton'
import Stepper from '../formHelpersComponents/Stepper'
import SubscriptionSelector from '../formHelpersComponents/SubscriptionSelector'
import { detailsSchema, signUpSchema, validationSchema } from '../../utils/YupSchemas'
import { handleRegister, handleVerifyCode, handleSaveDetails, handlePayment } from '../../handlers/subscriptionHandlers'

import { useLocation, useNavigate } from 'react-router-dom'
import useRegister from '../../hooks/useRegister'
import { useAuth } from '../../hooks/useAuth'
import { useSubscribe } from '../../hooks/useSubscribe'

const MotionBox = motion(Box)
const animationVariants = {
	initial: { opacity: 0, x: 100 },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: -100 },
}

const steps = [
	{ title: 'Sign up', description: null },
	{ title: 'Verify', description: null },
	{ title: 'Details', description: null },
]

const SubscriptionForm = () => {
	const { isDesktop, isTablet } = useUI()
	const { error: authError } = useRegister()
	const toast = useToast()
	const { activeStep, setActiveStep } = useSteps({
		initialStep: 0,
		count: steps.length,
	})
	const { currentUser, login, registerUser, logout, isLoading, verifyCode } = useAuth()
	const { saveSubscriptionDetails, payForSubscription, pricingOptions } = useSubscribe()
	const [plan, setPlan] = useState({ name: '', price: 0 })
	const [selectedPlan, setSelectedPlan] = useState(plan.name)
	const location = useLocation()
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
		if (email) {
			switch (true) {
				case !isVerified:
					setActiveStep(1)
					break
				case isVerified && subscription === null:
					setActiveStep(2)
					break
				default:
					break
			}
		} else {
			setActiveStep(0)
		}
	}, [currentUser])

	useEffect(() => {
		if (location.pathname === '/subscription') {
			const urlParams = new URLSearchParams(location.search)
			const plan = urlParams.get('plan')
			if (plan) {
				setPlan(pricingOptions.find(option => option.name.toLowerCase() === plan.toLowerCase()))
			}
		}
	}, [location])

	const nextStep = async data => {
		console.log(registerUser)
		switch (activeStep) {
			case 0:
				await handleRegister({ data, setActiveStep, registerUser })
				break
			case 1:
				await handleVerifyCode({ data, setActiveStep, verifyCode, currentUser })
				break
			case 2:
				await handleSaveDetails({ data, saveSubscriptionDetails })
				await handlePayment({ data: { amount: plan.price, name: plan.name }, payForSubscription })
				setActiveStep(3)
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
			overflow='hidden'
		>
			<Stack spacing='2em' direction={{ sm: 'column', md: 'row' }}>
				{isTablet || isDesktop ? (
					<Box w='50%' h='100%' m='auto 0'>
						<Image h='100%' w='auto' src={registerImg} />
					</Box>
				) : null}
				<Stack w={isDesktop || isTablet ? '50%' : '100%'} align='center' justify='space-between'>
					{currentUser && (
						<Text fontSize='md' p='0.5em 0'>
							{currentUser.email}
						</Text>
					)}
					<Stepper index={activeStep} />
					{activeStep === 0 && (
						<SubscriptionSelector
							selectedPlan={selectedPlan}
							setSelectedPlan={setSelectedPlan}
							valueProps={selectedPlan || plan.name}
							control={control}
							errors={errors}
							subscriptionPlans={pricingOptions}
							planName={plan.name}
						/>
					)}
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
							text={activeStep === 2 ? 'Pay' : 'Next'}
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
