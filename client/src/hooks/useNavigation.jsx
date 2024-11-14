// hooks/useNavigation.js
import { useState, useEffect, act } from 'react'
import { throttle } from 'lodash'
import { useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useAuth } from './useAuth'

const useNavigation = onClose => {
	const { logoutUser } = useAuth()
	const [scrollPosition, setScrollPosition] = useState(0)
	const [buttonType, setButtonType] = useState({ text: '', path: '', action: null })
	const location = useLocation()

	const isLoggedIn = Cookies.get('authStatus') === 'true'

	const handleLogout = async () => {
		await logoutUser.mutateAsync()
		onClose()
	}

	useEffect(() => {
		switch (location.pathname) {
			case '/':
				setButtonType({
					text: isLoggedIn ? 'Dashboard' : 'Get started',
					action: onClose,
					path: isLoggedIn ? '/dashboard' : '/subscription',
				})
				break
			case '/login':
				setButtonType({ text: 'Get started', path: '/subscription', action: onClose })
				break
			case '/subscription':
				setButtonType({ text: 'Login', path: '/login', action: onClose })
				break
			case '/dashboard':
			case '/dashboard/account':
			case '/dashboard/integrations':
				setButtonType({ text: 'Logout', action: handleLogout, path: '/' })
				break
			default:
				break
		}

		const calculateDistance = () => {
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop
			setScrollPosition(scrollTop)
		}

		const throttledCalculateDistance = throttle(calculateDistance, 200)
		window.addEventListener('scroll', throttledCalculateDistance)

		return () => {
			window.removeEventListener('scroll', throttledCalculateDistance)
		}
	}, [location.pathname, isLoggedIn])

	return {
		scrollPosition,
		buttonType,
		handleLogout,
	}
}

export default useNavigation
