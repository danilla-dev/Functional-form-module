import React from 'react'
import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import ActionButton from '../common/ActionButton'
import { animateScroll } from 'react-scroll'

import { useUI } from '../../hooks/useUI'

const HeaderText = ({ distance }) => {
	const { isDesktop } = useUI()

	const scroll = () => {
		animateScroll.scrollTo(distance + 2)
	}

	return (
		<VStack color='brand.50' maxW={isDesktop ? '55%' : '100%'} align={isDesktop ? 'start' : 'center'} spacing='1em'>
			<Heading as='h1' mb='0.5em' textAlign={!isDesktop && 'center'} minH={50}>
				Your own modern{' '}
				<Text as='strong' bgGradient='radial(accent.100, accent.50)' bgClip='text'>
					AI
				</Text>{' '}
				assistant!
			</Heading>
			<Text textAlign={!isDesktop && 'center'}>
				Unlock productivity with your personal AI assistant, designed to integrate into your daily life.
			</Text>
			<ActionButton
				text='Explore the future'
				icon={null}
				action={scroll}
				ariaLabel='Scroll to about section'
				priority='low'
				type='scroll'
			/>
		</VStack>
	)
}
export default HeaderText
