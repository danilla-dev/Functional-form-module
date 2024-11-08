import { useCallback } from 'react'
// hooks/useLoginForm.js
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginFormSchema } from '../utils/YupSchemas'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const useLoginForm = () => {
	const { loginUser, authError } = useAuth()
	const navigate = useNavigate()

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(LoginFormSchema),
	})

	const handleLogin = useCallback(
		async data => {
			const result = await loginUser.mutateAsync(data)
			if (result.email) {
				navigate('/dashboard')
			}
		},
		[loginUser, navigate]
	)

	return { control, handleSubmit, errors, handleLogin, authError }
}

export default useLoginForm
