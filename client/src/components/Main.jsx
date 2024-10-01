import React from 'react'

import { Container, Flex, Box } from '@chakra-ui/react'

const Main = () => {
	return (
		<Flex direction='column' align='center' bgColor='#1D1F33FF'>
			<Container as='section' id='About' maxW={1400} m={0} h={800} centerContent p='0 1em'>
				<Box h={300} w='100%' bgColor='red'></Box>
			</Container>
		</Flex>
	)
}

export default Main
