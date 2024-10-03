import { Box, Button } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { animateScroll } from 'react-scroll'

const HeaderButton = ({ distance }) => {
	return (
		<Box mt='1em'>
			<Button
				variant='outline'
				color='accent.50'
				borderColor='accent.50'
				w='180px'
				h='40px'
				fontSize='sm'
				_hover={{
					borderColor: 'brand.100',
					bgColor: 'brand.800',
					color: 'brand.900',
				}}
				onClick={() => animateScroll.scrollTo(distance + 2)}
			>
				Explore the future!
			</Button>
		</Box>
	)
}
export default HeaderButton
