import { FaUserCog, FaComments, FaPlug } from 'react-icons/fa'
export const features = [
	{
		icon: FaUserCog,
		header: 'Personalization',
		text: 'Our AI agent utilizes cutting-edge machine learning algorithms to adapt to your preferences. The more you interact with it, the better it understands your needs and can provide even more personalized recommendations.',
	},
	{
		icon: FaComments,
		header: 'Interactivity',
		text: 'As you engage with the agent, it continuously learns from your choices, refining its understanding of what you like and dislike. This dynamic learning process allows it to anticipate your needs and deliver tailored suggestions that enhance your experience.',
	},
	{
		icon: FaPlug,
		header: 'integrations',
		text: 'Our AI agent is designed to seamlessly integrate with your favorite apps and services. This allows you to access all of your tools and information in one place, streamlining your workflow and saving you time.',
	},
]
export const subjectsOptions = [
	{ value: 'Product Information', label: 'Product Information' },
	{ value: 'Technical Support', label: 'Technical Support' },
	{ value: 'Billing and Payments', label: 'Billing and Payments' },
	{ value: 'Troubleshooting', label: 'Troubleshooting' },
	{ value: 'Feedback or Suggestions', label: 'Feedback or Suggestions' },
	{ value: 'Other', label: 'Other' },
]
export const askQuestion = [
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
export const howItWorksTexts = [
	'Our AI agent utilizes cutting-edge machine learning algorithms to adapt to your preferences. The more you interact with it, the better it understands your needs and can provide even more personalized recommendations.',
	'As you engage with the agent, it continuously learns from your choices, refining its understanding of what you like and dislike. This dynamic learning process allows it to anticipate your needs and deliver tailored suggestions that enhance your experience.',
	'With advanced technology and an ongoing learning process, our AI agent becomes increasingly effective at adjusting to your lifestyle. You can be confident that with each use, the agent will more accurately reflect your preferences, offering recommendations that perfectly match your needs. This way, using the AI agent becomes a pleasure rather than just a functional tool.',
]
export const pricingOptions = [
	{
		name: 'Basic',
		price: 9.99,
		description: 'Ideal for casual users who need basic AI assistance in their day-to-day activities.',
		features: [
			'Personalized recommendations based on interactions',
			'Basic Q&A capabilities',
			'Access to AI insights and suggestions',
			'Integration with one platform (e.g., calendar, email)',
		],
		limits: [
			'Up to 50 interactions per month',
			'Limited to text-based interactions only',
			'1 personalized AI workflow',
		],
	},
	{
		name: 'Pro',
		price: 19.99,
		description: 'For power users who want more customization and advanced capabilities from their AI assistant.',
		features: [
			'Everything in Basic Plan',
			'Advanced personalization and in-depth AI learning',
			'Voice command support',
			'Integration with up to 3 platforms (e.g., calendar, email, task management)',
			'Priority support',
		],
		limits: ['Up to 200 interactions per month', '3 personalized AI workflows', 'Real-time notifications and updates'],
		best: true,
	},
	{
		name: 'Premium',
		price: 39.99,
		description: 'The ultimate AI plan with unlimited interaction and full integration options.',
		features: [
			'Everything in Pro Plan',
			'Unlimited interactions',
			'Advanced analytics and insights on behavior',
			'Full integration with up to 10 platforms (e.g., calendar, email, project management, e-commerce)',
			'AI-driven automation for tasks and reminders',
			'Dedicated customer success manager',
		],
		limits: ['Everything unlimited!'],
	},
]
