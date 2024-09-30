import React from 'react'
import { Image, Box, useBreakpointValue, Center, Heading, Text, Button } from '@chakra-ui/react'

import { motion } from 'framer-motion'

import heroImageSM from '../assets/hero-img-sm.jpg'
import heroImageLG from '../assets/hero-img-lg.jpg'
import heroImageMD from '../assets/hero-img-md.jpg'

const Header = () => {
	const imageSize = useBreakpointValue({ base: heroImageSM, md: heroImageMD, lg: heroImageLG })
	return (
		<Box w='100%' h='100%'>
			<Image src={imageSize} alt='hero image with a processor' boxSize='100%' objectFit='cover' />
			<Box h='100vh' w='100% ' pos='absolute' top={0} bgColor='#031C3D6C' />
			<Center pos='absolute' top={0} h='100vh' w='100%' p='1em' display='flex' flexDir='column'>
				<motion.div
					initial={{ opacity: 0, y: 150 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ ease: 'easeOut', duration: 1 }}
				>
					<Heading as='h1' color='#fff' fontSize={{ base: 28, md: 40, lg: 56 }} textAlign='center'>
						Your own modern AI assistant!
					</Heading>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, y: 150 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ ease: 'easeOut', duration: 1, delay: 1.1 }}
				>
					<Text color='#fff' fontSize={{ base: 12, md: 16, lg: 20 }} textAlign='center'>
						We provide a modern AI assistant that can help you with your daily tasks and make your life easier.
					</Text>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, y: 150 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ ease: 'easeOut', duration: 1, delay: 2.1 }}
				>
					<Box
						as='button'
						variant='ghost'
						colorScheme='white'
						borderColor='#fff'
						size='lg'
						fontSize={{ base: 12, md: 20, lg: 22 }}
						fontWeight={600}
						borderRadius={5}
						mt='2em'
						color={'#FFFFFF'}
						p={{ base: '0.5em 1em' }}
						_hover={{ color: '#FFFFFF', transition: '0.5s', borderColor: '#FFFFFF', bgColor: '#0B458DBD' }}
					>
						Explore the future
					</Box>
				</motion.div>
			</Center>
		</Box>
	)
}

export default Header
