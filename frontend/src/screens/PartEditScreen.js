import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listPartDetails, updatePart } from '../actions/partActions'
import { PART_UPDATE_RESET } from '../constants/partConstants'

const PartEditScreen = ({ match, history }) => {
  const partId = match.params.id

  const [itemName, setItemName] = useState('')
  const [image, setImage] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [partNumber, setPartNumber] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const partDetails = useSelector((state) => state.partDetails)
  const { loading, error, part } = partDetails

  const partUpdate = useSelector((state) => state.partUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = partUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PART_UPDATE_RESET })
      history.push('/admin/partlist')
    } else {
      if (!part.item_name || part._id !== partId) {
        dispatch(listPartDetails(partId))
      } else {
        setItemName(part.item_name)
        setImage(part.image)
        setCountInStock(part.countInStock)
        setPartNumber(part.part_number)
      }
    }
  }, [dispatch, history, partId, part, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updatePart({
        _id: partId,
        itemName,
        image,
        partNumber,
        countInStock,
      })
    )
  }

  return (
    <>
      <Link to='/admin/partlist' className='btn btn-outline-primary my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Part</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='itemName'>
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter Item Name'
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={partNumber}
                onChange={(e) => setPartNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default PartEditScreen