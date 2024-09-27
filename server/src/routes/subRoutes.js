import express from 'express'
import { getSub, postSub } from '../controllers/subController.js'

const router = express.Router()

router.get('/my-sub', getSub)

router.post('/new-sub', postSub)

export default router
