import React from 'react'
import {
	Container,
	Heading,
	Stack,
	VStack,
	HStack,
	Box,
	Image,
	Text,
	List,
	ListItem,
	ListIcon,
	OrderedList,
	UnorderedList,
	Card,
	CardBody,
	Divider,
	CardHeader,
} from '@chakra-ui/react'
import { features } from '../../data/mainSectionConstants'

const BestFeatures = () => {
	return (
		<Container
			m={0}
			centerContent
			p='.5em'
			minW='100%'
			bgColor='brand.200'
			boxShadow='0 -4px 12px #A7A7A778, 0 4px 12px #a7a7a778'
		>
			<Stack maxW={1400} w='100%' align='center'>
				<HStack justify='space-evenly' align='center' flexDirection='row-reverse' pos='relative' pb='2em'>
					<Box w='100%'>
						<List
							spacing='1.5em'
							display='flex'
							flexDirection={{ base: 'column', md: 'row' }}
							justifyContent='center'
							alignItems={{ base: 'center', md: 'baseline' }}
						>
							{features.map((feature, index) => {
								const Icon = feature.icon
								return (
									<ListItem
										key={index}
										h={{ base: '100%', md: '33%' }}
										w={{ base: '80%', md: '33%' }}
										borderTop={{ base: '1px solid', md: 'none' }}
										borderColor={'brand.50'}
										border={index === 0 && { base: 'none', md: '1px solid' }}
									>
										<Card bgColor='transparent' p='.5em' borderRadius={10} zIndex={10} h='100%' boxShadow='none'>
											<CardHeader pb={0}>
												<HStack justify='center'>
													<ListIcon as={Icon} color='brand.500' fontSize='xl' />
													<Heading as='h3' fontSize='sm' color='brand.500'>
														{feature.header}
													</Heading>
												</HStack>
											</CardHeader>
											<CardBody>
												<Text color='brand.50' fontSize='sm' textAlign='center'>
													{feature.text}
												</Text>
											</CardBody>
										</Card>
									</ListItem>
								)
							})}
						</List>
					</Box>
				</HStack>
			</Stack>
		</Container>
	)
}

export default BestFeatures
