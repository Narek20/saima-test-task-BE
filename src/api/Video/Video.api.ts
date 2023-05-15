import { Router } from 'express'
import {
  courseraVideoDownload,
  getVideoById,
  youtubeVideoDownload,
} from './Video.api.handlers'
import { verifyToken } from '../../middleware/auth.middleware'

const router = Router()

router.post('/download/youtube', verifyToken, youtubeVideoDownload)
router.post('/download/coursera', verifyToken, courseraVideoDownload)
router.get('/:id', verifyToken, getVideoById)

export default router
