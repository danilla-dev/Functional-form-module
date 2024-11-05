import React from 'react'

import { Button } from '@chakra-ui/react'

const ActionButton = ({ text, icon, action, ariaLabel, priority, type, content, isDisabled, iconPosition }) => {
	const lowPriorityStyles = {
		color: 'brand.400',
		borderColor: 'accent.50',
		bgColor: 'transparent',
		_hover: { borderColor: 'brand.500', color: 'brand.500' },
	}

	const highPriorityStyles = {
		borderColor: 'brand.100',
		color: 'brand.250',
		fontWeight: '400',
		bgColor: 'brand.500',
		w: '180px',
		h: '40px',
		_hover: {
			borderColor: 'brand.100',
			bgColor: 'brand.550',
			color: 'brand.100',
		},
	}

	const styles = priority === 'low' ? lowPriorityStyles : highPriorityStyles

	return (
		<Button
			leftIcon={iconPosition === 'left' && icon}
			rightIcon={iconPosition === 'right' && icon}
			color={styles.color}
			borderColor={styles.borderColor}
			size='lg'
			bgColor={styles.bgColor}
			type={type}
			boxShadow='xl'
			role='button'
			aria-label={ariaLabel}
			transition='0.3s'
			onClick={action}
			_hover={styles._hover}
			isDisabled={isDisabled}
			zIndex={10}
		>
			{content ? content : text}
		</Button>
	)
}

export default ActionButton
