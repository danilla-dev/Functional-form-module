import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import App from './App.jsx'
import './index.css'
import { color } from 'framer-motion'

const theme = extendTheme({
	// Ustawienia typografii
	colors: {
		brand: {
			50: '#f5f7ff', // white text
			100: '#F6F3FFFF', // section white background
			200: '#040120FF', // drawer background
			300: '#0C013AE0', // nav background
			400: '#2A9D8F', // light green for headers and buttons
			500: '#E76F51', // coral for headers and buttons
			600: '#F9C74F', // sunny yellow for highlights
			700: '#F94144', // intense red for highlights
			800: '#264653', // dark blue-green for button backgrounds (hover)
			900: '#A8DADC', // light blue for button backgrounds (hover)
		},
		accent: {
			50: '#3cbbc7', // main accent color
			100: '#00b894', // additional accent color
			200: '#00cec9', // additional accent color
			300: '#0984e3', // blue accent
			400: '#d63031', // red accent
		},
	},
	fonts: {
		heading: `'Roboto', sans-serif`,
		body: `'Roboto', sans-serif`,
	},
	fontSizes: {
		xs: '12px',
		sm: '14px',
		md: '16px',
		lg: '18px',
		xl: '20px',
		'2xl': '24px',
		'3xl': '30px',
		'4xl': '36px',
		'5xl': '48px',
		'6xl': '64px',
	},

	textStyles: {},

	styles: {
		global: props => ({
			'html, body': {
				fontFamily: 'body',
				color: 'black',
				bg: 'white',
				lineHeight: 'base',
			},
			'*::placeholder': {
				color: 'gray.400',
			},
			'*, *::before, &::after': {
				boxSizing: 'border-box',
			},
			h1: {
				fontSize: ['4xl', 'xl'],
				fontWeight: 'bold',
				lineHeight: '110%',
				letterSpacing: '-0.01em',
			},
			h2: {
				fontSize: ['3xl', '4xl'],
				fontWeight: 'semibold',
				lineHeight: '110%',
				letterSpacing: '-0.01em',
			},
			p: {
				fontSize: ['md', 'md', 'md', 'lg'],
				fontWeight: 'normal',
				lineHeight: '1.6',
			},
			strong: {
				color: 'accent.50',
			},
			'.logo': {
				fontSize: '24px',
			},
		}),
	},
})

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</StrictMode>
)
