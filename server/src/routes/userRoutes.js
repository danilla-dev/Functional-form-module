import express from 'express'
import auth from '../middleware/auth.js'
import { createUser, loginUser, fetchUserDetails, verifyUser, logoutUser } from '../controllers/userController.js'

const router = express.Router()

router.post('/login', loginUser)

router.get('/status', auth, fetchUserDetails)

router.post('/register', createUser)

router.post('/verify', verifyUser)

router.post('/logout', logoutUser)

export default router
