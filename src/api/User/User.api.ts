import { Router } from 'express'
import { createUser, deleteUser, login } from './User.api.handlers'
import { verifyToken } from '../../middleware/auth.middleware'

const router = Router()

router.post('/login', login)
router.post('/register', createUser)
router.delete('/:email', verifyToken,  deleteUser)

export default router
