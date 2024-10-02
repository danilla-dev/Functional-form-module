import {
	Box,
	Button,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import {  animateScroll } from 'react-scroll'


const HeaderButton = ({distance}) => {
	return (
		<Box mt='1em'>
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
					onClick={() => animateScroll.scrollTo(distance + 2)}
				>
					Explore the future!
				</Button>
	</Box>
	)
}
export default HeaderButton