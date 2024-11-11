import React from 'react'
import { Box, Image } from '@chakra-ui/react'
import robotAI from '../../assets/AIRobot.webp'
import { useUI } from '../../hooks/useUI'

const HeaderImage = () => {
	const { isDesktop } = useUI()

	return (
		<Box w='100%' maxW={isDesktop ? '40%' : 350} className='header-image'>
			<Image
				src={robotAI}
				h='100%'
				w='100%'
				filter='drop-shadow(2px 2px 2px #5162FF56)'
				objectFit='cover'
				alt='Image of ai robot agent'
			/>
		</Box>
	)
}
export default HeaderImage
