import {
	Box,
	Stepper as ChakraStepper,
	Step,
	StepIndicator,
	StepStatus,
	StepNumber,
	StepTitle,
	StepDescription,
	StepIcon,
	StepSeparator,
} from '@chakra-ui/react'
import { formSteps } from '../../data/formsConstants'

const Stepper = ({ index }) => {
	return (
		<Box w='95%' mb='1em' className='form-stepper'>
			<ChakraStepper index={index} size='md' flexWrap='wrap' justifyContent='center'>
				{formSteps.map((step, index) => (
					<Step key={index} flex='1' p='0 .25em'>
						<StepIndicator>
							<StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
						</StepIndicator>
						<Box flexShrink='0'>
							<StepTitle>{step.title}</StepTitle>
							<StepDescription>{step.description}</StepDescription>
						</Box>
						<StepSeparator />
					</Step>
				))}
			</ChakraStepper>
		</Box>
	)
}
export default Stepper
