import React from 'react'
import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import HeaderButton from './HeaderButton'

const HeaderText = ({ isDesktop, distance }) => {
	return (
		<VStack color='brand.50' maxW={isDesktop ? '55%' : '100%'} align={isDesktop ? 'start' : 'center'} spacing='1em'>
			<Heading as='h1' mb='0.5em' textAlign={!isDesktop && 'center'} minH={50}>
				Your own modern{' '}
				<Text as='strong' bgGradient='linear(to-r, accent.50, accent.300)' bgClip='text'>
					AI
				</Text>{' '}
				assistant!
			</Heading>
			<Text textAlign={!isDesktop && 'center'}>
				Unlock productivity with your personal AI assistant, designed to integrate into your daily life.
			</Text>
			<HeaderButton distance={distance} />
		</VStack>
	)
}
export default HeaderText
