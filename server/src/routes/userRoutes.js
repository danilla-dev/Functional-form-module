import express from 'express'
import auth from '../middleware/auth.js'
import { createUser, loginUser, fetchUserDetails, continueRegistration } from '../controllers/userController.js'

const router = express.Router()

router.post('/login', auth, loginUser)

router.get('/status', auth, fetchUserDetails)

router.post('/register', createUser)

router.get('/complete-registration', continueRegistration)

export default router
