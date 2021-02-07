import React, { useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import Paginate from '../components/Paginate'
import {
  listParts,
  deletePart,
} from '../actions/partActions'

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

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    dispatch(listParts('', pageNumber))

  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deletePart(id))
    }
  }

  const createPartHandler = () => {
    history.push(`/admin/part/create`)
  }

  const handleRowClick = (id) => {
    history.push(`/admin/part/${id}/edit`)
  }  

  return (
    <>
      <Meta title={'Demands Database | Admin | Part List'}></Meta>
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
                <tr key={part._id} >
                  <td onClick={() => {handleRowClick(part._id)}}>{part._id}</td>
                  <td onClick={() => {handleRowClick(part._id)}}>{part.item_name}</td>
                  <td onClick={() => {handleRowClick(part._id)}}>{part.part_number}</td>
                  <td onClick={() => {handleRowClick(part._id)}}>{part.niin}</td>
                  <td onClick={() => {handleRowClick(part._id)}}>{part.countInStock}</td>
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