import { useToast } from '@chakra-ui/react'
import { useEffect } from 'react'

export const useToastNotification = (status, title, description) => {
	const toast = useToast()

	useEffect(() => {
		if (status === 'success') {
			toast({
				title: title,
				description: description,
				status: 'success',
				duration: 2500,
				isClosable: true,
			})
		}
	}, [status, title, description, toast])
}
