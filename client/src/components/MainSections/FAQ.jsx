import React from 'react'
import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Box,
	Stack,
	Heading,
	Container,
	Text,
} from '@chakra-ui/react'

import { useUI } from '../../hooks/useUI'
import { askQuestion } from '../../data/mainSectionConstants'

const FAQ = () => {
	const { isBase, isMobile, isDesktop, isTablet } = useUI()

	return (
		<Container m={0} p='3em 2em' pb='5em' centerContent minW='100%' position='relative' className='faq'>
			<Stack w='100%' maxW={1100} color='brand.100' align='center'>
				<Heading
					as='h2'
					borderBottom='2px solid'
					textAlign='center'
					mb='0.5em'
					p='0 1em'
					pb='.25em'
					color='accent.300'
					fontSize='2xl'
				>
					FAQ
				</Heading>
				<Accordion allowToggle borderColor='accent.300' w='100%' bgColor='transparent' pt='2em' color='brand.100'>
					{askQuestion.map((question, index) => {
						return (
							<AccordionItem key={index} p='1em'>
								<Heading>
									<AccordionButton>
										<Box as='span' flex='1' textAlign='left'>
											<Text as='h3' fontSize='md'>
												{question.question}
											</Text>
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</Heading>
								<AccordionPanel p='1em' borderTop='1px solid' borderTopColor='brand.100'>
									<Text fontSize='sm'>{question.answer}</Text>
								</AccordionPanel>
							</AccordionItem>
						)
					})}
				</Accordion>
			</Stack>
		</Container>
	)
}

export default FAQ
