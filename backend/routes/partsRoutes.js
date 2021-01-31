import express from 'express'
import { getParts, getPartByID, deletePart} from '../controllers/partController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getParts)
router.route('/:id').get(getPartByID).delete(protect, admin, deletePart)

export default router
