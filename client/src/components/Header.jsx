import React, { useRef, useState, useEffect } from 'react'
import {
	Image,
	Box,
	useBreakpointValue,
	Center,
	Heading,
	Text,
	Container,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	HStack,
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Button,
	Stack,
	VStack,
	Flex,
} from '@chakra-ui/react'
import { Link, animateScroll } from 'react-scroll'
import { GiHamburgerMenu } from 'react-icons/gi'
import { motion } from 'framer-motion'

import Navigation from './navigation/Navigation'

import heroImageSM from '../assets/hero-img-sm.png'
import heroImageLG from '../assets/hero-img-lg.png'
import robotAI from '../assets/AIRobot.svg'

const Header = () => {
	const displaySize = useBreakpointValue({ base: 'mobile', md: 'tablet', lg: 'desktop' })
	const isDesktop = displaySize === 'desktop'
	const componentRef = useRef(null)

	const [distanceFromTop, setDistanceFromTop] = useState(0)

	useEffect(() => {
		const calculateDistance = () => {
			if (componentRef.current) {
				const rect = componentRef.current.getBoundingClientRect()
				const scrollTop = window.pageYOffset || document.documentElement.scrollTop
				const distance = rect.bottom + scrollTop
				setDistanceFromTop(distance)
			}
		}
		calculateDistance()
		window.addEventListener('resize', calculateDistance)
		return () => {
			window.removeEventListener('resize', calculateDistance)
		}
	}, [])

	return (
		<Flex direction='column' align='center' position='relative' id='Home' h='100%' w='100%' ref={componentRef}>
			<Navigation isDesktop={isDesktop} />
			<Box w='100%' h='100%' pos='absolute' top={0} left={0}>
				<Image
					src={isDesktop ? heroImageLG : heroImageSM}
					boxSize='100%'
					objectFit='cover'
					alt='Background blue image'
					zIndex={5}
				/>
			</Box>
			<VStack spacing='2em' minH='100%' w='100%' zIndex={10} p='65px 1.5em'>
				<Box textAlign='center' color='#FFFFFF'>
					<motion.div
						initial={{ opacity: 0, y: 180 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ ease: 'easeOut', duration: 1.1 }}
					>
						<Heading as='h1' size='4xl' mb='0.5em'>
							Your own modern{' '}
							<Text as='span' color='#3cbbc7'>
								AI
							</Text>{' '}
							assistant!
						</Heading>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 150 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ ease: 'easeOut', duration: 1.1, delay: 0.8 }}
					>
						<Text fontSize={15}>
							We provide a modern{' '}
							<Text as='span' color='#3cbbc7'>
								AI{' '}
							</Text>{' '}
							assistant that can help you with your daily tasks and make your{' '}
							<Text as='span' color='#3cbbc7'>
								life easier.
							</Text>
						</Text>
					</motion.div>
				</Box>
				<Box>
					<Image size='sm' src={robotAI} />
				</Box>
				<motion.div
					initial={{ y: 0 }}
					animate={{ y: 10 }}
					transition={{ duration: 1, delay: 0, repeat: Infinity, repeatType: 'reverse', bounce: 0.2 }}
				>
					<Box>
						<Button
							variant='outline'
							color='#3cbbc7'
							size='lg'
							borderColor='#3cbbc7'
							w='180px'
							h='40px'
							fontSize={14}
							_hover={{
								borderColor: '#FFFFFF',
								bgColor: '#368CDD44',
								color: '#FFFFFF',
							}}
							onClick={() => animateScroll.scrollTo(distanceFromTop + 2)}
						>
							Explore the future!
						</Button>
					</Box>
				</motion.div>
			</VStack>
		</Flex>
	)
}

export default Header
