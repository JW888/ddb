import asyncHandler from 'express-async-handler'
import Part from '../models/partModel.js'



// @desc Fetch all parts
// @route GET /api/parts
// @access Public
const getParts = asyncHandler(async(req, res) => {
    const parts = await Part.find({})
    res.json(parts)
})


// @desc Fetch single part
// @route GET /api/parts
// @access Public

const getPartByID = asyncHandler(async (req, res) => {
    const part = await Part.findById(req.params.id)

    if(part) {
        res.json(part)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
    
})

export {
    getParts,
    getPartByID,
}

