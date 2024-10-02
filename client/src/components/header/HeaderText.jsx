import React from 'react'
import {
	Box,
	Heading,
	Text,
	VStack
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import HeaderButton from './HeaderButton'

const HeaderText = ({isDesktop, distance}) => {


	return (
		<VStack  color='#FFFFFF' maxW={isDesktop && "55%"} align={isDesktop ? 'start' : 'center'}  spacing='1em'>
		<motion.div
			initial={{ opacity: 0, x: 180 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ ease: 'easeOut', duration: 1.5 }}
		>
			<Heading as='h1' size='4xl' mb='0.5em'  textAlign={!isDesktop && 'center'}>
				Your own modern{' '}
				<Text as='span' color='#3cbbc7'>
					AI
				</Text>{' '}
				assistant!
			</Heading>
		</motion.div>
		<motion.div
			initial={{ opacity: 0, x: -150 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ ease: 'easeOut', duration: 1.5, delay: 1.2 }}
		>
			<Text fontSize={18} fontWeight={400}  textAlign={!isDesktop && 'center'}>
			Unlock the future of <Text color='#3cbbc7' as="strong">productivity</Text >  with your own personal <Text color='#3cbbc7'  as="strong">AI assistant</Text>, designed to seamlessly integrate into your daily life. Whether you need help <Text color='#3cbbc7'  as="strong">managing your schedule, organizing tasks</Text > , or answering complex questions, our <Text color='#3cbbc7'  as="strong">AI</Text > offers advanced capabilities to support you every step of the way. From drafting <Text color='#3cbbc7'  as="strong">emails</Text > and setting <Text color='#3cbbc7' as="strong">reminders</Text > to providing real-time <Text color='#3cbbc7'  as="strong">insights</Text > and handling repetitive tasks, this <Text color='#3cbbc7'  as="strong">assistant</Text > is like having a personal  <Text color='#3cbbc7'  as="strong">manager</Text > at your fingertips.

Subscribe now and let our <Text color='#3cbbc7'  as="strong">AI</Text > take care of the hard work, so you can focus on what truly matters.
				
			</Text>
		</motion.div>
		<HeaderButton distance={distance} />
	</VStack> 
	)
}
export default HeaderText