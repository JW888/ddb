import asyncHandler from 'express-async-handler'
import Part from '../models/partModel.js'



// @desc Fetch all parts
// @route GET /api/parts
// @access Public
const getParts = asyncHandler(async(req, res) => {

  const pageSize = 2

  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword ? {
    item_name: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  } : {}

  const count = await Part.countDocuments({ ... keyword})
  const parts = await Part.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1))
  res.json({ parts, page, pages: Math.ceil(count/pageSize) })
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

    const {
      itemName,
      image,
      countInStock,
      partNumber,
    } = req.body

    const part = new Part({
      item_name: itemName,
      user: req.user._id,
      image: image,
      part_number:partNumber,
      niin: '00-000-0000',
      adrn:'0',
      variant:0,
      codified_mrn:'0',
      group_class:0,
      date_last_amended: new Date(),
      rac:'0',
      ui:'0',
      tsub:'',
      countInStock: countInStock,
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
      image,
      countInStock,
    } = req.body
  
    const part = await Part.findById(req.params.id)
  
    if (part) {
      part.name = name
      part.image = image
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

