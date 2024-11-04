import express from 'express'
import { postUserIntegration, getUserIntegration } from '../controllers/integrationsController.js'
import auth from '../middleware/auth.js'

const router = express.Router()
router.get('/', auth, getUserIntegration)

router.post('/', auth, postUserIntegration)
export default router
