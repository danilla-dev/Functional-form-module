export const checkboxesContext = [
	{ text: 'Calendar management', value: 'calendar' },
	{ text: 'Setting reminders', value: 'reminders' },
	{ text: 'Data analysis', value: 'analysis' },
	{ text: 'Report generation', value: 'report' },
	{ text: 'Task automation', value: 'task' },
]
export const selectsContext = [
	{
		label: 'Notification preferences',
		options: ['Daily', 'Hourly', '12-hour', 'Real-time'],
		name: 'notificationPreferences',
	},
	{ label: 'Communication style', options: ['Formal', 'Informal'], name: 'communicationStyle' },
]
export const signupInputs = [
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
	{
		label: 'Repeat password',
		type: 'password',
		name: 'confirmPassword',
		defaultValue: '123456789Ab.',
	},
	{
		label: 'Phone number',
		type: 'number',
		name: 'phoneNumber',
		defaultValue: 56486,
	},
]

export const loginInputs = [
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

export const formSteps = [
	{ title: 'Sign up', description: null },
	{ title: 'Verify', description: null },
	{ title: 'Details', description: null },
]
export const passwordRequirements = [
	{ text: 'at least 8 characters', regExp: /^.{8,}$/ },
	{ text: 'one uppercase', regExp: /[A-Z]/ },
	{ text: 'one lowercase', regExp: /[a-z]/ },
	{ text: 'one number', regExp: /\d/ },
	{ text: 'special character', regExp: /[!@#$%^&*.,]/ },
]
