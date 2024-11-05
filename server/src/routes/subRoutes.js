import express from 'express'
import {
	getUserSubscription,
	postUserSubscription,
} from '../controllers/subController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

console.log('Subscription routes is running');

router.get('/details', auth, getUserSubscription)

router.post('/details', auth, postUserSubscription)

export default router
