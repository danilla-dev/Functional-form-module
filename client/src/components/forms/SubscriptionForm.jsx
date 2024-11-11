import React, { useState, useEffect, useRef, useMemo } from 'react'
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
import useSubscriptionForm from '../../hooks/useSubscriptionForm'
import { formSteps } from '../../data/formsConstants'

const MotionBox = motion(Box)
const animationVariants = {
	initial: { opacity: 0, x: 100 },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: -100 },
}

const SubscriptionForm = () => {
	const { isDesktop, isTablet } = useUI()
	const toast = useToast()
	const { activeStep, setActiveStep } = useSteps({
		initialStep: 0,
		count: formSteps.length,
	})
	const { currentUser, authError } = useAuth()
	const { pricingOptions } = useSubscribe()
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
		defaultValues: { subscriptionPlan: plan.name },
	})

	const { nextStep, errors: formErrors } = useSubscriptionForm(activeStep, setActiveStep, plan)

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search)
		const planName = urlParams.get('plan')?.toLowerCase()
		if (planName) {
			const selectedPlan = pricingOptions.find(option => option.name.toLowerCase() === planName)
			if (selectedPlan) setPlan(selectedPlan)
		}
	}, [location.search, pricingOptions])

	const stepComponents = {
		0: <SignUp control={control} errors={errors} authError={authError.email} />,
		1: <VerifyCode control={control} errors={errors} authError={authError.code} />,
		2: <Details control={control} errors={errors} />,
	}

	return (
		<Box
			as='form'
			maxW={800}
			w='90%'
			maxH='100vh'
			border='1px solid'
			borderColor='accent.300'
			p='2em'
			borderRadius={10}
			bgColor='brand.300'
			color='brand.100'
			boxShadow='dark-lg'
			onSubmit={handleSubmit(nextStep)}
			overflow='hidden'
			className='subscription-form'
			id='subscription-form'
		>
			<Stack spacing='2em' direction={{ sm: 'column', md: 'row' }} justify='space-between'>
				{isTablet || isDesktop ? (
					<Box w='50%' h='100%' m='auto 0'>
						<Image h='100%' w='auto' src={registerImg} />
					</Box>
				) : null}
				<Stack w={isDesktop || isTablet ? '50%' : '100%'} maxW={400} align='center' justify='space-between'>
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
							setValue={setValue}
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
						{stepComponents[activeStep]}
					</MotionBox>
					<ButtonGroup justifyContent='space-around' w='100%' mt='1.5em'>
						<ActionButton
							text={activeStep === 2 ? 'Pay' : 'Next'}
							icon={activeStep === 2 ? <IoIosSend /> : <MdNavigateNext />}
							action={handleSubmit(nextStep)}
							ariaLabel='Send Question'
							priority={activeStep === 2 ? 'high' : 'low'}
							type='button'
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
