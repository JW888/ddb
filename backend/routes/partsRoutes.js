import express from 'express'
import { getParts, getPartByID, deletePart, createPart, updatePart} from '../controllers/partController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getParts)
    .post(protect, admin, createPart)
router.route('/:id').get(getPartByID)
    .delete(protect, admin, deletePart)
    .put(protect, admin, updatePart)

export default router
