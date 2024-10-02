import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import subRoutes from './src/routes/subRoutes.js'
import userRoutes from './src/routes/userRoutes.js'
dotenv.config()

const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

app.use(express.static(path.join(__dirname, '../client/dist')));

// routes
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
})

app.use('/api/user', userRoutes)
app.use('/api/sub', subRoutes)

// database connection
app.listen(process.env.PORT, () => {
	console.log('Server is running on port 4000')
})
// mongoose
// 	.connect(process.env.MONGO_URI)
// 	.then(() => {
// 	})
// 	.catch(error => {
// 		console.log('Database connection failed')
// 		console.log(error)
// 	})
