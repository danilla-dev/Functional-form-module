import * as yup from 'yup'

export const signUpSchema = yup.object().shape({
	email: yup.string().email('Invalid email format').required('Email is required'),
	password: yup.string().required('Password is required'),
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
export const integrationSchema = yup.object().shape({
	platform: yup.string().required('Platform is required'),
	apiKey: yup
		.string()
		.matches(
			/^[a-zA-Z][a-zA-Z0-9._-]{19,39}$/,
			'API Key must be 20-40 characters long, start with a letter, and can include letters, numbers, ".", "-", "_"'
		)
		.required('API Key is required'),
})
