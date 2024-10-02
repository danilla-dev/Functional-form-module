import React from 'react'
import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import HeaderButton from './HeaderButton'
import { Fade, Slide, Hinge } from 'react-awesome-reveal'

const HeaderText = ({ isDesktop, distance }) => {
	return (
		<VStack color='brand.50' maxW={isDesktop && '55%'} align={isDesktop ? 'start' : 'center'} spacing='1em'>
			<Fade cascade triggerOnce duration={1500}>
				<Heading as='h1' mb='0.5em' textAlign={!isDesktop && 'center'}>
					Your own modern <Text as='strong'>AI</Text> assistant!
				</Heading>
			</Fade>
			<Fade cascade delay={1000} triggerOnce duration={1500}>
				<Text textAlign={!isDesktop && 'center'}>
					Unlock the future of <Text as='strong'>productivity</Text> with your own personal{' '}
					<Text as='strong'>AI assistant</Text>, designed to seamlessly integrate into your daily life. Whether you need
					help <Text as='strong'>managing your schedule, organizing tasks</Text> , or answering complex questions, our{' '}
					<Text as='strong'>AI</Text> offers advanced capabilities to support you every step of the way. From drafting{' '}
					<Text as='strong'>emails</Text> and setting <Text as='strong'>reminders</Text> to providing real-time{' '}
					<Text as='strong'>insights</Text> and handling repetitive tasks, this <Text as='strong'>assistant</Text> is
					like having a personal <Text as='strong'>manager</Text> at your fingertips. Subscribe now and let our{' '}
					<Text as='strong'>AI</Text> take care of the hard work, so you can focus on what truly matters.
				</Text>
			</Fade>

			<HeaderButton distance={distance} />
		</VStack>
	)
}
export default HeaderText
