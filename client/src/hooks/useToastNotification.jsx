import { useToast, Box, Text, HStack } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import { useEffect } from 'react'

export const useToastNotification = (status, title, description) => {
	const toast = useToast()

	useEffect(() => {
		if (status === 'success') {
			toast({
				duration: 2500,
				render: () => (
					<Box
						color='white'
						bg='green.300'
						fontSize={{ base: 'sm' }}
						borderRadius={5}
						p={{ base: '0.25em 0.5em', md: '0.75em 1.5em' }}
					>
						<HStack align='center' justify='start'>
							<CheckCircleIcon color='brand.250' />
							<Text fontSize={{ base: 'md' }} fontWeight='bold' color='brand.250'>
								{title}
							</Text>
						</HStack>
						<Text fontSize={{ base: 'sm' }}>{description}</Text>
					</Box>
				),
			})
		}
	}, [status, title, description, toast])
}
