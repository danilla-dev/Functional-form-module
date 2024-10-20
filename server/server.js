import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import subRoutes from './src/routes/subRoutes.js'
import userRoutes from './src/routes/userRoutes.js'
import paymentRoutes from './src/routes/paymentRoutes.js'
import { updateDatabase } from './src/controllers/paymentController.js'

dotenv.config()

const app = express()

app.use(helmet())

const corsOptions = {
	origin: 'http://localhost:5173',
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	credentials: true,
}

app.use(cors(corsOptions))
app.use(cookieParser())

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use('/api/payment/webhook', express.raw({ type: 'application/json' }), updateDatabase)

app.use(express.json())

app.use(express.static(path.join(__dirname, '../client/dist')))

app.use('/api/payment', paymentRoutes)
app.use('/api/auth', userRoutes)
app.use('/api/sub', subRoutes)

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/dist')))

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../client/dist', 'index.html'))
	})
} else {
	app.get('/', (req, res) => {
		res.send('API is running in development mode')
	})
}

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		const port = process.env.PORT || 4000
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`)
		})
	})
	.catch(error => {
		console.error('Database connection failed:', error)
	})
