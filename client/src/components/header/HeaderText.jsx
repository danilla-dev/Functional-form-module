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
				Unlock the future of productivity with your own personal AI assistant, designed to seamlessly integrate into
				your daily life. Whether you need help managing your schedule, organizing tasks, or answering complex questions,
				our AI offers advanced capabilities to support you every step of the way. From drafting emails and setting
				reminders to providing real-time insights and handling repetitive tasks, this assistant is like having a
				personal manager at your fingertips. Subscribe now and let our AI take care of the hard work, so you can focus
				on what truly matters.
			</Text>
			<HeaderButton distance={distance} />
		</VStack>
	)
}
export default HeaderText
