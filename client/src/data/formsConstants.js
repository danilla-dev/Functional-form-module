import { all } from 'axios'

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
export const integrationOptions = [
	{
		value: 'ebay',
		text: 'e-bay',
		img: 'https://upload.wikimedia.org/wikipedia/commons/4/48/EBay_logo.png',
		alt: 'eBay logo',
	},
	{
		value: 'gmail',
		text: 'Gmail',
		img: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg',
		alt: 'Gmail logo',
	},
	{
		value: 'allegro',
		text: 'Allegro',
		img: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Allegro.pl_sklep.svg',
		alt: 'Allegro logo',
	},
	{
		value: 'google-calendar',
		text: 'Google Calendar',
		img: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg',
		alt: 'Google Calendar logo',
	},
	{
		value: 'google-drive',
		text: 'Google Drive',
		img: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg',
		alt: 'Google Drive logo',
	},
]
