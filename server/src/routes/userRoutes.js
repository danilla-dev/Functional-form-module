import express from 'express'
import { readUser, updateUser } from '../controllers/userController.js'

const router = express.Router()

router.get('/read', readUser)

router.post('/update', updateUser)

export default router
