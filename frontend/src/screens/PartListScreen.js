import React, { useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
  listParts,
  deletePart,
  createPart,
} from '../actions/partActions'
import { PART_CREATE_RESET } from '../constants/partConstants'

const PartListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const partList = useSelector((state) => state.partList)
  const { loading, error, parts, page, pages } = partList

  const partDelete = useSelector((state) => state.partDelete)

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = partDelete

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
    successDelete,
    successCreate,
    createdPart,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deletePart(id))
    }
  }

  const createPartHandler = () => {
    dispatch(createPart())
  }

  const handleRowClick = (id) => {
    history.push(`/parts/${id}`)
  }  

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Parts</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createPartHandler}>
            <i className='fas fa-plus'></i> Create Part
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PART No.</th>
                <th>NIIN</th>
                <th>SOH</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {parts.map((part) => (
                <tr key={part._id} onClick={() => {handleRowClick(part._id)}}>
                  <td>{part._id}</td>
                  <td>{part.item_name}</td>
                  <td>{part.part_number}</td>
                  <td>{part.niin}</td>
                  <td>{part.countInStock}</td>
                  <td>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(part._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default PartListScreen