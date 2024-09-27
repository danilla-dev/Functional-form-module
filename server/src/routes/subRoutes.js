import express from 'express'
import { getUserSubscription, registerUserSubscription } from '../controllers/subController.js'

const router = express.Router()

router.get('/user/details', getUserSubscription)

router.post('/user/register', registerUserSubscription)

export default router
