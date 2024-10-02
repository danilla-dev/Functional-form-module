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
			50: '#f5f7ff', // napisy białe
			100: '#F6F3FFFF', // section white bg
			200: '#04012042', // drawer bg
			300: '#0C013AE0', // nav bg
			400: '#818fff',
			500: '#6071ff',
			600: '#4d5bcc',
			700: '#3a4499',
			800: '#272d66',
			900: '#141733',
		},
		accent: {
			50: '#3cbbc7', // koror wyroznienia
			100: '#ffedef',
			200: '#ffced2',
			300: '#ffb0b5',
			400: '#ff9298',
			500: '#ff747b',
			600: '#cc5d62',
			700: '#99464a',
			800: '#662f31',
			900: '#331719',
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
