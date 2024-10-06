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
const askQuestion = [
	{
		question: 'What is the AI assistant that I can subscribe to?',
		answer:
			'Our AI assistant is a modern tool designed to help you manage your daily tasks by integrating with your calendar, email, project management system, and e-commerce. By subscribing, you gain access to advanced features that make your life easier.',
	},
	{
		question: 'What are the main features of the AI assistant?',
		answer:
			'Our AI assistant offers a range of features, including personalization based on interactions, app integration, and task automation capabilities. With these features, you can focus on what truly matters while the assistant handles the rest.',
	},
	{
		question: 'What specific tasks can the AI assistant perform?',
		answer: `The AI assistant can perform a variety of tasks, including :
    -Creating and managing reminders
    -Organizing your schedule and planning meetings
    -Responding to emails and drafting message templates
    -Managing tasks and projects
    -Generating reports and insights based on data
    -Integrating with e-commerce applications to manage sales
    `,
	},
	{
		question: 'How does the personalization process work in the AI assistant?',
		answer:
			'The AI assistant uses machine learning algorithms to adapt to your preferences. The more you engage with it, the better it understands your needs and provides more personalized recommendations, enhancing its effectiveness.',
	},
	{
		question: 'What subscription options and pricing are available?',
		answer:
			'We offer three subscription plans: Basic ($9.99/month), Pro ($19.99/month), and Premium ($39.99/month). Each plan provides different features and interaction limits tailored to your needs.',
	},
	{
		question: 'Can the AI assistant integrate with my favorite apps?',
		answer:
			'Yes, our AI assistant is designed to seamlessly integrate with your favorite applications, allowing you to access all your tools and information in one place. This greatly streamlines your workflow and saves you time.',
	},
]
const FAQ = ({ display }) => {
	const { isBase, isMobile, isDesktop, isTablet } = display

	return (
		<Container m={0} p='3em 2em' pb='5em' centerContent minW='100%' position='relative'>
			<Stack w='100%' maxW={1100} color='brand.100' align='center'>
				<Heading as='h2' borderBottom='3px solid' w='100%' textAlign='center' mb='0.5em' pb='.25em' color='accent.200'>
					FAQ
				</Heading>
				<Accordion
					allowToggle
					border='1px solid'
					bgGradient='radial( brand.300 20%, brand.350)'
					borderRadius={10}
					w='100%'
					overflow='hidden'
					borderColor='accent.200'
				>
					{askQuestion.map((question, index) => {
						return (
							<AccordionItem key={index} p='1em'>
								<Heading as='h3'>
									<AccordionButton>
										<Box as='span' flex='1' textAlign='left'>
											<Text fontSize='lg'>{question.question}</Text>
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</Heading>
								<AccordionPanel p='1em' borderTop='1px solid' borderTopColor='brand.100'>
									<Text fontSize='lg'>{question.answer}</Text>
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
