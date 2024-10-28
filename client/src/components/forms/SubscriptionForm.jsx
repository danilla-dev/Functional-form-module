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
	HStack,
	Radio,
	RadioGroup,
	VStack,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverFooter,
	PopoverArrow,
	PopoverCloseButton,
	PopoverAnchor,
	useDisclosure,
	IconButton,
	List,
	ListItem,
	ListIcon,
	Divider,
} from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'
import { FaCheck, FaTimes } from 'react-icons/fa'
import emailjs from '@emailjs/browser'
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
import { detailsSchema, signUpSchema, validationSchema } from '../../utils/YupSchemas'

import { useLocation, useNavigate } from 'react-router-dom'
import useRegister from '../../hooks/useRegister'
import { useAuth } from '../../hooks/useAuth'
import { useSubscribe } from '../../hooks/useSubscribe'
import { set } from 'lodash'

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

const StepperComponent = ({ index }) => {
	return (
		<Box w='95%' mb='1em'>
			<Stepper index={index} size='md' flexWrap='wrap' justifyContent='center'>
				{steps.map((step, index) => (
					<Step key={index} flex='1' p='0 .25em'>
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

const SubscriptionPopover = ({ isOpen }) => {
	return (
		<Popover isOpen={isOpen}>
			<PopoverTrigger></PopoverTrigger>
			<PopoverContent>
				<PopoverArrow />
				<PopoverCloseButton />
				<PopoverHeader>Confirmation!</PopoverHeader>
				<PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
			</PopoverContent>
		</Popover>
	)
}
const SubscriptionSelector = ({ onChange, value, subscriptionPlans }) => {
	return (
		<RadioGroup onChange={onChange} value={value} w='100%' name='subscription-select' m='0.5em  0'>
			<HStack spacing='24px' justify='space-between'>
				{subscriptionPlans.map((option, index) => {
					const { isOpen, onToggle, onClose } = useDisclosure()

					return (
						<VStack
							position='relative'
							key={option.name}
							border='1px solid'
							w={100}
							h={100}
							justify='center'
							borderColor={value === option.name ? 'brand.500' : 'brand.100'}
							borderRadius={10}
							_hover={{ borderColor: 'brand.500' }}
							cursor='pointer'
							onClick={() => onChange(option.name)}
						>
							<Box position='absolute' top={0} right={0} p='0.25em'>
								<Popover isOpen={isOpen} onClose={onClose} placement='bottom'>
									<PopoverTrigger>
										<IconButton
											aria-label='show-subscription-info'
											color='brand.100'
											border='transparent'
											variant='outline'
											isRound
											fontSize='sm'
											icon={<InfoIcon />}
											onClick={e => {
												e.stopPropagation()
												onToggle()
											}}
											_hover={{ bgColor: 'transparent' }}
										/>
									</PopoverTrigger>
									<PopoverContent
										color='brand.100'
										fontSize='md'
										bgColor='brand.200'
										borderColor='brand.800'
										borderRadius={10}
									>
										<PopoverArrow bgColor='brand.200' borderColor='brand.800' />
										<PopoverCloseButton fontSize='sm' fontWeight={400} m='0.25em' />
										<PopoverHeader>{option.name} plan Info</PopoverHeader>
										<PopoverBody p='0.5em'>
											<List spacing='0.25em' textAlign='start'>
												{option.features.map((feature, index) => {
													return (
														<ListItem key={index}>
															<HStack align='baseline' spacing='0.5em'>
																<ListIcon as={FaCheck} color='accent.300' fontSize='xs' />
																<Text fontSize='sm'>{feature}</Text>
															</HStack>
														</ListItem>
													)
												})}
											</List>
										</PopoverBody>
									</PopoverContent>
								</Popover>
							</Box>
							<Radio size='lg' value={option.name} display='none' />
							<Text fontSize='lg' mt='0.25em'>
								{option.name}
							</Text>
							<Text fontSize='md'>{option.price} $</Text>
						</VStack>
					)
				})}
			</HStack>
		</RadioGroup>
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
	const { saveSubscriptionDetails, payForSubscription, pricingOptions } = useSubscribe()
	const [plan, setPlan] = useState({ name: '', price: 0 })
	const [selectedPlan, setSelectedPlan] = useState(plan.name)
	const location = useLocation()
	const navigate = useNavigate()
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

	const onChangePlan = e => {
		setSelectedPlan(e)
		navigate(`/subscription?plan=${e.toLowerCase()}`)
	}

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
				await handleSendEmail(emailData)
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
	}

	const handlePayment = async data => {
		console.log(data)
		const result = await payForSubscription.mutateAsync(data)
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
				await handleSaveDetails(data)
				await handlePayment({ amount: plan.price, name: plan.name })
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
					<StepperComponent index={activeStep} />
					{activeStep === 0 && (
						<SubscriptionSelector
							value={selectedPlan || plan.name}
							onChange={onChangePlan}
							subscriptionPlans={pricingOptions}
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
