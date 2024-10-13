import express from 'express'
import { postPayment, updateDatabase } from '../controllers/paymentController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/', auth, postPayment)

export default router
