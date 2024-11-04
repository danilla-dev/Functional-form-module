// LoginForm.js
import React from 'react'
import { Box, Stack, Text, ButtonGroup, Image } from '@chakra-ui/react'
import LoginFormInputs from '../formHelpersComponents/LoginFormInputs'
import useLoginForm from '../../hooks/useLoginForm'
import loginImg from '../../assets/register-img.webp'
import ActionButton from '../common/ActionButton'
import { useUI } from '../../hooks/useUI'

const LoginForm = () => {
	const { control, handleSubmit, errors, handleLogin } = useLoginForm()
	const { isTablet, isDesktop } = useUI()

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
				<Stack w={{ base: '100%', md: '50%' }} align='center' justify='center'>
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
