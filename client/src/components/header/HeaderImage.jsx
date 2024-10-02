import React from 'react'
import { Box, Image } from '@chakra-ui/react'
import robotAI from '../../assets/AIRobot.svg'

const HeaderImage = ({ isDesktop }) => {
	return (
		<Box w='100%' maxW={isDesktop ? '40%' : 350}>
			<Image src={robotAI} h='100%' w='100%' filter='drop-shadow(2px 2px 2px #5162FF56)' />
		</Box>
	)
}
export default HeaderImage
