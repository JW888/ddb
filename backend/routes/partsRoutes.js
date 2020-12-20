import express from 'express'
import { getParts, getPartByID} from '../controllers/productController.js'

const router = express.Router()

router.route('/').get(getParts)
router.route('/:id').get(getPartByID) 

export default router
