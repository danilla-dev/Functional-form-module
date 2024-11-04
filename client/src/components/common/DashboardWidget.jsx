import React from 'react'
import {
	Box,
	Text,
	Stack,
	VStack,
	Heading,
	Container,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	StackDivider,
} from '@chakra-ui/react'
const DashboardWidget = ({ content }) => {
	const { header, body, dividerVisibility, fullWidth } = content
	console.log(body)
	return (
		<Card
			border='1px solid'
			borderColor='accent.300'
			bgColor='brand.350'
			color='brand.100'
			p='1em'
			borderRadius={10}
			minW={{ base: 350, md: fullWidth ? '100%' : 320 }}
			w={{ base: '90%', md: '45%' }}
			boxShadow='0px 0px 16px 4px rgba(0,125,121,0.25)'
		>
			<CardHeader>
				<Heading size='md' color='accent.300'>
					{header}
				</Heading>
			</CardHeader>
			<CardBody w='100%'>
				<Stack divider={dividerVisibility && <StackDivider />} spacing='1em'>
					{body.map((element, index) => {
						console.log(element)
						const key = Object.keys(element)[0]
						return (
							<Box key={index}>
								<Heading as='h3' size='sm' mb='0.5em'>
									{element[key].description || null}
								</Heading>
								<Text fontSize='sm'>{dividerVisibility ? element[key].value : element}</Text>
							</Box>
						)
					})}
				</Stack>
			</CardBody>
		</Card>
	)
}
export default DashboardWidget
