import React, { createContext, useState } from 'react'
import { useBreakpointValue } from '@chakra-ui/react'

export const UIContext = createContext()

export const UIProvider = ({ children }) => {
	const displaySize = useBreakpointValue({
		base: 'base',
		sm: 'mobile',
		md: 'tablet',
		lg: 'desktop',
	})
	const isBase = displaySize === 'base'
	const isMobile = displaySize === 'desktop'
	const isTablet = displaySize === 'tablet'
	const isDesktop = displaySize === 'desktop'
	const isWideDesktop = displaySize === 'wide-desktop'

	const display = {
		isMobile,
		isDesktop,
		isTablet,
		isBase,
		isWideDesktop,
	}

	return <UIContext.Provider value={{ ...display }}>{children}</UIContext.Provider>
}
