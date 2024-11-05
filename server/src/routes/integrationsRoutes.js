import express from 'express'
import { postUserIntegration, getUserIntegration } from '../controllers/integrationsController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

console.log('Integration routes is running')

router.get('/', auth, getUserIntegration)

router.post('/', auth, postUserIntegration)
export default router
