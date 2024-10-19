import React from 'react'
import { useUI } from '../../hooks/useUI'
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
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
} from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import loginImg from '../../assets/register-img.webp'
import ActionButton from '../common/ActionButton'
import { LoginFormSchema } from '../../utils/YupSchemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const inputs = [
	{
		label: 'Email address',
		type: 'email',
		name: 'email',
		defaultValue: '',
	},
	{
		label: 'Password',
		type: 'password',
		name: 'password',
		defaultValue: '123456789Ab.',
	},
]
const LoginFormInputs = ({ control, errors }) => {
	return (
		<>
			{inputs.map((input, index) => {
				return (
					<FormControl isRequired key={index} isInvalid={errors[input.name]}>
						<FormLabel> {input.label} </FormLabel>
						<Controller
							name={input.name}
							control={control}
							defaultValue={input.defaultValue}
							render={({ field }) => <Input type={input.type} borderColor='accent.300' {...field} />}
						/>
						{errors[input.name] && <FormErrorMessage>{errors[input.name].message}</FormErrorMessage>}
					</FormControl>
				)
			})}
		</>
	)
}

const LoginForm = () => {
	const { isDesktop, isTablet } = useUI()
	const { loginUser } = useAuth()
	const { currentUser, setCurrentUser } = useAuth()
	const navigate = useNavigate()

	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(LoginFormSchema),
	})

	const handleLogin = async data => {
		const result = await loginUser.mutateAsync(data)
		if (result.email) {
			navigate('/dashboard')
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
		>
			<Stack spacing='2em' direction={{ sm: 'column', md: 'row' }}>
				{isTablet || isDesktop ? (
					<Box w='50%' h='100%' m='auto 0'>
						<Image h='100%' w='auto' src={loginImg} />
					</Box>
				) : null}
				<Stack w={isDesktop || isTablet ? '50%' : '100%'} align='center' justify='center'>
					<Text fontSize='xl' p='0.5em 0'>
						Welcome back!
					</Text>
					<LoginFormInputs control={control} errors={errors} />
					<ButtonGroup justifyContent='space-around' w='100%' mt='1.5em'>
						<ActionButton
							text='Login'
							icon={null}
							action={handleSubmit(handleLogin)}
							ariaLabel='Send Question'
							priority='high'
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

export default LoginForm
