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
        throw new Error('Part not found')
    }
    
})

// @desc    Delete a part
// @route   DELETE /api/parts/:id
// @access  Private/Admin
const deletePart = asyncHandler(async (req, res) => {
    const part = await Part.findById(req.params.id)
  
    if (part) {
      await part.remove()
      res.json({ message: 'Part removed' })
    } else {
      res.status(404)
      throw new Error('Part not found')
    }
  })
  
  // @desc    Create a part
  // @route   POST /api/parts
  // @access  Private/Admin
  const createPart = asyncHandler(async (req, res) => {
    const part = new Part({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
    })
  
    const createdPart = await part.save()
    res.status(201).json(createdPart)
  })
  
  // @desc    Update a part
  // @route   PUT /api/parts/:id
  // @access  Private/Admin
  const updatePart = asyncHandler(async (req, res) => {
    const {
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
    } = req.body
  
    const part = await Part.findById(req.params.id)
  
    if (part) {
      part.name = name
      part.price = price
      part.description = description
      part.image = image
      part.brand = brand
      part.category = category
      part.countInStock = countInStock
  
      const updatedPart = await part.save()
      res.json(updatedPart)
    } else {
      res.status(404)
      throw new Error('Part not found')
    }
  })

export {
    getParts,
    getPartByID,
    deletePart,
    createPart,
    updatePart,
}

