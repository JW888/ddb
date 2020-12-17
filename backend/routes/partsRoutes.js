import express from 'express'
import asyncHandler from 'express-async-handler'
import Part from '../models/partModel.js'

const router = express.Router()

export default router


// @desc Fetch all parts
// @route Get /api/parts
// @access Public

router.get('/', asyncHandler (async (req, res) => {
    const parts = await Part.find({})
    res.json(parts)
}))


// @desc Fetch single part
// @route Get /api/parts
// @access Public

router.get('/:id', asyncHandler(async (req, res) => {
    const part = await Part.findById(req.params.id)

    if(part) {
        res.json(part)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
    
}))