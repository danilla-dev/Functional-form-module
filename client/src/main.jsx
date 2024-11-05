import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { border, ChakraProvider, extendTheme, Input, textDecoration } from '@chakra-ui/react'

import App from './App.jsx'
import './index.css'

import { UIProvider } from './contexts/UIContext'
import { AuthProvider } from './contexts/AuthContext'
import { SubscriptionProvider } from './contexts/SubscriptionContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { IntegrationsProvider } from './contexts/IntegrationsContext.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { color } from 'framer-motion'
import { size } from 'lodash'

const theme = extendTheme({
	// Ustawienia typografii
	colors: {
		brand: {
			50: '#f5f7ff', // white text
			100: '#F6F3FFFF', // section white background
			150: '#f7f5ff4d', // section white background alpha 30
			200: '#040120FF', // drawer background
			250: '#0C0350FF', // drawer background gradient
			300: '#0C013AE0', // nav background
			350: '#0C013AF5', // nav background gradient
			400: '#2A9D8F', // light green for headers and buttons
			500: '#E76F51', // coral for headers and buttons
			550: '#E6512CFF', // coral for headers and buttons gradient
			600: '#F9C74F', // sunny yellow for highlights
			700: '#F94144', // intense red for highlights
			800: '#264653', // dark blue-green for button backgrounds (hover)
			900: '#A8DADC', // light blue for button backgrounds (hover)
			950: '#A8DADCA9', // light blue for button backgrounds (hover)
		},
		accent: {
			50: '#3cbbc7', // main accent color
			100: '#00b894', // additional accent color
			200: '#00cec9', // additional accent color
			300: '#0984e3', // blue accent -- used for borders in inputs and form with brand.300 and gradient radial( brand.300 20%, brand.350)' in background
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

	components: {
		input: {
			size: 'lg',
		},
	},

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
				lineHeight: '1.6',
			},

			label: {
				fontSize: ['sm', 'md'],
				paddingTop: '0.5em',
			},
			textArea: {
				padding: '1em',
			},

			'.option-dark, option': {
				background: 'brand.250 !important',
			},

			'.logo': {
				fontSize: '24px',
			},
			'.active': {
				color: 'accent.200',
			},
		}),
	},
})
const queryClient = new QueryClient()

const mode = import.meta.env.VITE_MODE

// if (mode === 'development') {
// 	import('@welldone-software/why-did-you-render').then(whyDidYouRender => {
// 		whyDidYouRender.default(React)
// 	})
// }
createRoot(document.getElementById('root')).render(
	// <StrictMode>
	<ChakraProvider theme={theme}>
		<QueryClientProvider client={queryClient}>
			<Router>
				<AuthProvider>
					<SubscriptionProvider>
						<IntegrationsProvider>
							<UIProvider>
								<App />
							</UIProvider>
						</IntegrationsProvider>
					</SubscriptionProvider>
				</AuthProvider>
			</Router>
		</QueryClientProvider>
	</ChakraProvider>
	// </StrictMode>
)
