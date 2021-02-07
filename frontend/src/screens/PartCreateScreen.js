import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import FormContainer from '../components/FormContainer'
import { listParts, createPart } from '../actions/partActions'
import { PART_CREATE_RESET } from '../constants/partConstants'


const PartEditScreen = ({ match, history }) => {

  const pageNumber = match.params.pageNumber || 1

  const [itemName, setItemName] = useState('')
  const [image, setImage] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [partNumber, setPartNumber] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const partList = useSelector((state) => state.partList)
  const { loading, error } = partList

  const partCreate = useSelector((state) => state.partCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    part: createdPart,
  } = partCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: PART_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/part/${createdPart._id}/edit`)
    } else {
      dispatch(listParts('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successCreate,
    createdPart,
    pageNumber,
  ])

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
      createPart({
        itemName,
        image,
        partNumber,
        countInStock,
      })
    )
  }

  return (
    <>
      <Meta title={'Demands Database | Admin | Create Part'}></Meta>
      <Link to='/admin/partlist' className='btn btn-outline-primary my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Part</h1>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
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
                placeholder='/images/sample.jpg'
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

            <Form.Group controlId='partNumber'>
              <Form.Label>Part Number</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Part Number'
                value={partNumber}
                onChange={(e) => setPartNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Create
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default PartEditScreen