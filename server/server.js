import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import authRoutes from './src/routes/authRoutes.js'
import userRoutes from './src/routes/userRoutes.js'
dotenv.config()

const app = express()

// routes
app.get('/', (req, res) => {
	res.send('Hello World!')
})
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

// database connection
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log('Server is running on port 4000')
		})
	})
	.catch(error => {
		console.log('Database connection failed')
		console.log(error)
	})
