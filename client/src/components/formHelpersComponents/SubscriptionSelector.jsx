import React from 'react'
import {
	Text,
	Box,
	HStack,
	Radio,
	RadioGroup,
	VStack,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverArrow,
	PopoverCloseButton,
	useDisclosure,
	IconButton,
	List,
	ListItem,
	ListIcon,
	FormControl,
	FormLabel,
	FormErrorMessage,
} from '@chakra-ui/react'
import { Controller } from 'react-hook-form'
import { InfoIcon } from '@chakra-ui/icons'
import { FaCheck } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import useSubscriptionSelector from '../../hooks/useSubscriptionSelector'

const SubscriptionSelector = React.memo(
	({ selectedPlan, setSelectedPlan, valueProps, control, errors, subscriptionPlans, setValue }) => {
		const navigate = useNavigate()
		const { selectedPlan: plan, handlePlanChange } = useSubscriptionSelector(
			selectedPlan,
			setSelectedPlan,
			navigate,
			valueProps,
			setValue
		)

		console.log('SubscriptionSelector is rendering')
		return (
			<FormControl isRequired isInvalid={errors.subscriptionPlan}>
				<FormLabel>Select a plan:</FormLabel>
				<Controller
					name='subscriptionPlan'
					control={control}
					defaultValue={valueProps}
					render={({ field: { onChange, value } }) => {
						return (
							<RadioGroup onChange={onChange} value={value} w='100%' m='0.5em  0'>
								<HStack spacing='24px' justify='space-between'>
									{subscriptionPlans.map(option => {
										const { isOpen, onToggle, onClose } = useDisclosure()
										return (
											<VStack
												key={option.name}
												position='relative'
												border='1px solid'
												w={100}
												h={100}
												justify='center'
												borderColor={value === option.name ? 'brand.500' : 'brand.100'}
												borderRadius={10}
												_hover={{ borderColor: 'brand.500' }}
												cursor='pointer'
												onClick={() => {
													handlePlanChange(option.name)
													onChange(option.name)
												}}
											>
												<Box position='absolute' top={0} right={0} p='0.25em'>
													<Popover isOpen={isOpen} onClose={onClose} placement='bottom'>
														<PopoverTrigger>
															<IconButton
																aria-label='show-subscription-info'
																color='brand.100'
																border='transparent'
																variant='outline'
																isRound
																fontSize='sm'
																icon={<InfoIcon />}
																onClick={e => {
																	e.stopPropagation()
																	onToggle()
																}}
																_hover={{ bgColor: 'transparent' }}
															/>
														</PopoverTrigger>
														<PopoverContent
															color='brand.100'
															fontSize='md'
															bgColor='brand.200'
															borderColor='brand.800'
															borderRadius={10}
														>
															<PopoverArrow bgColor='brand.200' borderColor='brand.800' />
															<PopoverCloseButton fontSize='sm' fontWeight={400} m='0.25em' />
															<PopoverHeader>{option.name} plan Info</PopoverHeader>
															<PopoverBody p='0.5em'>
																<List spacing='0.25em' textAlign='start'>
																	{option.features.map((feature, index) => (
																		<ListItem key={index}>
																			<HStack align='baseline' spacing='0.5em'>
																				<ListIcon as={FaCheck} color='accent.300' fontSize='xs' />
																				<Text fontSize='sm'>{feature}</Text>
																			</HStack>
																		</ListItem>
																	))}
																</List>
															</PopoverBody>
														</PopoverContent>
													</Popover>
												</Box>
												<Radio size='lg' value={option.name} display='none' />
												<Text fontSize='lg' mt='0.25em'>
													{option.name}
												</Text>
												<Text fontSize='md'>{option.price} $</Text>
											</VStack>
										)
									})}
								</HStack>
							</RadioGroup>
						)
					}}
				/>
				{errors && <FormErrorMessage>{errors.subscriptionPlan?.message}</FormErrorMessage>}
			</FormControl>
		)
	}
)

export default SubscriptionSelector
