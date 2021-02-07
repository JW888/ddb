import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Table, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listParts } from '../actions/partActions'
import Meta from '../components/Meta'

const HomeScreen = ( {match} ) => {

  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const partList = useSelector(state => state.partList)
  const { loading, error, parts, page, pages} = partList
 
  useEffect(() => {
    dispatch(listParts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  const history = useHistory();

  const handleRowClick = (id) => {
    history.push(`/parts/${id}`)
  }  

  return (
    <>
    <Meta title={"Demands Database | Home"}></Meta>
      <h1>Search Parts</h1>
      {loading ? (<Loader>Loading...</Loader>) : error ? (<Message variant='danger'>{error}</Message>) : (
        <>
          <Row>
            <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th scope="col">Item Name</th>
                <th scope="col">Part Number</th>
                <th scope="col">NIIN</th>
              </tr>
            </thead>
            <tbody>
              {parts.map((part) => (
                  <tr key={part._id} onClick={() => {handleRowClick(part._id)}}>
                      <td>{part.item_name}</td>
                      <td>{part.part_number}</td>
                      <td>{part.niin}</td>
                  </tr>
              ))}
            </tbody>
          </Table>
        </Row>
        <Paginate pages={pages} page={page} keyword={keyword ? keyword: ''}/>
        </>
      )}
    </> 
  )
}

export default HomeScreen