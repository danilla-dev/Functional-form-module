import express from 'express'
import auth from '../middleware/auth.js'
import { createUser, loginUser, fetchUserDetails, continueRegistration } from '../controllers/userController.js'

const router = express.Router()

router.post('/login', loginUser)

router.get('/details', auth, fetchUserDetails)

router.get('/complete-registration', continueRegistration)

router.post('/create', createUser)

export default router
