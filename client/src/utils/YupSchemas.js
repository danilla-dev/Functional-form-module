import * as yup from 'yup'

export const signUpSchema = yup.object().shape({
	email: yup.string().email('Invalid email format').required('Email is required'),
	password: yup
		.string()
		// .min(8, 'Password must have at least 8 characters') // Minimalna długość
		// .matches(/[a-z]/, 'Password must contain at least one lowercase letter') // Co najmniej jedna mała litera
		// .matches(/[A-Z]/, 'Password must contain at least one uppercase letter') // Co najmniej jedna wielka litera
		// .matches(/\d/, 'Password must contain at least one number') // Co najmniej jedna cyfra
		// .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character') // Co najmniej jeden znak specjalny
		.required('Password is required'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match')
		.required('Password repeat is required'),
	phoneNumber: yup
		.string()
		.matches(/^[\d\s()+-]*$/, 'Phone number can only contain digits, spaces, and special characters like +, -, (, )')
		.required('Phone number is required'),
	subscriptionPlan: yup
		.string()
		.oneOf(['Basic', 'Pro', 'Premium'], 'You must select a subscription')
		.required('Subscription is required'),
})

export const detailsSchema = yup.object().shape({
	preferences: yup
		.array()
		.of(yup.string().required('At least one preference is required'))
		.min(1, 'At least one preference is required'),
	notificationPreferences: yup.string().required('Communication preferences are required'),
	communicationStyle: yup.string().required('Communication style is required'),
})
export const validationSchema = yup.object().shape({
	verificationCode: yup
		.string()
		.matches(/^[0-9]+$/, 'Code must contain only digits')
		.length(6, 'Code must be 6 digits long')
		.required('Code is required'),
})

export const LoginFormSchema = yup.object().shape({
	email: yup.string().email('Invalid email format').required('Email is required'),
	password: yup.string().required('Password is required'),
})
